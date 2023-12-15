const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const { username, password, repeatedPassword, userType } = req.body;

    // Check if the password and repeated password match
    if (password !== repeatedPassword) {
      return res.render("login", {
        error: "Passwords do not match!!",
        successMsg: null,
      });
    }

    await User.create({
      username,
      password,
      userType,
    });
    //after creating user redirect it to login page
    await res.render("login", {
      successMsg: "User created sucessfully!! User can login now.",
      error: null,
    });
  } catch (error) {
    res.status(500);
    res.end(error.message);
  }
};
