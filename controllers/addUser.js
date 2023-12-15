// models
const User = require("../models/User");

module.exports = async (req, res) => {
  const userId = req.session.userId;

  const { make, model, year, plateNo, ...rest } = req.body;

  const paramToUpdate = {
    ...rest,
    car_details: {
      make,
      model,
      year,
      plateNo,
    },
    testType: "G2", // since it is from G2 page
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, paramToUpdate, {
      returnDocument: "after", //return updated user details
    });

    // when the user detail is added and saved on database then send the toast message along with status 200 and stay on same page
    res.status(200).render("g2License", {
      user: updatedUser,
      successMsg: "User Detail Added Successfully!!",
      errorMsg: null,
      slots: null,
    });
  } catch (error) {
    res.status(500).send("An Error occured while creating the user.");
  }
};
