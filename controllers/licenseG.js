const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const userId = req.session.userId;

  try {
    const foundUser = await User.findById(userId);

    if (foundUser) {
      //check if license number is empty(i.e default value) or not
      const defaultLicenseNumber = "";
      const isLicenseNumberEmpty = await bcrypt.compare(
        defaultLicenseNumber,
        foundUser.licenseNo
      );
      if (!isLicenseNumberEmpty) {
        //if it is not default value i.e user has already entered valid license number
        return res.render("gLicense", {
          user: foundUser,
          errorMsg: null,
          successMsg: null,
          slots: null, // this is used to see the available dates and time to book an appointment
        });
      }
      //else, if it is default value, display message to help user to login to G2 page
      return res.render("gLicense", {
        user: null,
        errorMsg: "User has not entered information from G2 page",
        successMsg: null,
        slots: null, // this is used to see the available dates and time to book an appointment
      });
    }
    // if user not found, redirect to login page
    return res.redirect("/auth");
  } catch (error) {
    res.status(500).end(error.message);
  }
};
