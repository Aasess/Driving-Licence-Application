const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    bcrypt.compare(password, user.password, (error, same) => {
      if (same) {
        //store in session cookies
        req.session.userId = user._id;
        req.session.userType = user.userType;

        // if passwords match redirect to home page
        res.redirect("/");
      } else {
        res.render("login", {
          error: "Incorrect username or password",
          successMsg: null,
        });
      }
    });
  } else {
    res.render("login", {
      error: "Incorrect username or password",
      successMsg: null,
    });
  }
};
