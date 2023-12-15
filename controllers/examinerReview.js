const User = require("../models/User");

module.exports = async (req, res) => {
  const { userId, comment, passFail } = req.body;
  const testType = req.query.t_select;

  try {
    // Update the user data in the database
    await User.findByIdAndUpdate(
      userId,
      { comment: comment, isPass: Boolean(Number(passFail)) },
      { new: true }
    );

    // find the user that has testType and appointmentId is not null
    const foundDriverList = await User.find({
      testType,
      appointmentId: { $ne: null },
    }).populate("appointment");

    return res.render("examiner", {
      selectedType: testType,
      data: foundDriverList,
      successMsg: "Driver review submitted.",
    });
  } catch (error) {
    console.error("Error updating test results:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
