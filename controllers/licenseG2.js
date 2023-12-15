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
        // if license number is not empty(not default), render g2License page with foundUser
        return res.render("g2License", {
          user: foundUser,
          successMsg: null,
          errorMsg: null,
          slots: null, // this is used to see the available dates and time to book an appointment
        });
      }
      // else, render g2License page and show link that allows user to redirect to gLicense page
      return res.render("g2License", {
        user: null,
        successMsg: null,
        errorMsg: null,
        slots: null,
      });
    }
    // if user not found, redirect to login page
    return res.redirect("/auth");
  } catch (error) {
    res.status(500).end(error.message);
  }
};
