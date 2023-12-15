const Appointment = require("../models/Appointment");
const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const date = req.query.selectedDate;
  const driverType = req.params.driverType;

  const foundAvailableSlots = await Appointment.find({
    date,
    isTimeSlotAvailable: true,
  });

  const userId = req.session.userId;
  const user = await User.findById(userId);

  if (user) {
    const dynamicRenderName = driverType === "g" ? "gLicense" : "g2License";

    // check if license number is default(empty) or not
    const isSame = await bcrypt.compare("", user.licenseNo);
    if (!isSame) {
      //i.e user has updated licsenceNo
      return res.status(200).render(dynamicRenderName, {
        user,
        successMsg: null,
        errorMsg: null,
        slots: foundAvailableSlots,
      });
    } else {
      //display the empty form for user to enter detail
      return res.status(200).render(dynamicRenderName, {
        user: null,
        successMsg: null,
        errorMsg: null,
        slots: foundAvailableSlots,
      });
    }
  }

  if (driverType === "g") {
    return res.redirect("/license/g");
  }
  return res.redirect("/license/g2");
};
