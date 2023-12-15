const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    //find the user that has flag(isPass) either true or false
    const foundDriverList = await User.find({
      isPass: { $exists: true, $type: "bool" },
    }).populate("appointment");

    res.render("driverStatus", {
      data: foundDriverList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error + "Internal server error" });
  }
};
