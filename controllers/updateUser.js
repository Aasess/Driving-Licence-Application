// models
const User = require("../models/User");

module.exports = async (req, res) => {
  const id = req.session.userId;
  try {
    //find user document with the id and update
    const user = await User.findByIdAndUpdate(
      id,
      {
        testType: "G",
        car_details: { ...req.body },
      },
      { returnDocument: "after" }
    );

    res.render("gLicense", {
      user: user,
      errorMsg: null,
      successMsg: "User Updated Successfully!!",
    });
  } catch (error) {
    res.status(500).send("An Error occured while updating the user.");
  }
};
