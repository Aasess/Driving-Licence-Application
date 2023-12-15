const User = require("../models/User");

module.exports = async (req, res) => {
  const testType = req.query.t_select;

  try {
    // find the user that has testType and appointmentId is not null
    const foundDriverList = await User.find({
      testType,
      appointmentId: { $ne: null },
    }).populate("appointment");

    res.render("examiner", {
      selectedType: testType,
      data: foundDriverList,
      successMsg: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
