// models
const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    // find user based on license number
    const user = await User.findOne({ licenseNo: req.body.licenseNo });
    if (user) {
      // display their detail in g page
      res.render("gLicense", { user, errorMsg: null, successMsg: null });
    } else {
      res.render("gLicense", {
        user: null,
        errorMsg: "User Not Found",
        successMsg: null,
      });
    }
  } catch (error) {
    res.status(500).send("An Error occured while fetching the user.");
  }
};
