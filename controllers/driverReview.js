const User = require("../models/User");

module.exports = async (req, res) => {
  const userId = req.session.userId;

  try {
    const foundUser = await User.findById(userId);

    console.log(foundUser);
    return res.render("review", { user: foundUser });
  } catch (error) {
    res.status(500).end(error.message);
  }
};
