const User = require("../models/User");

const driverAuth = async (req, res, next) => {
  const user = await User.findById(req.session.userId);

  const isDriveLoggedIn = user && user.userType === "Driver";
  if (!isDriveLoggedIn) {
    //if user is not logged in as "Driver", redirect to auth page to login
    return res.redirect("/auth");
  }
  next();
};

const adminAuth = async (req, res, next) => {
  const user = await User.findById(req.session.userId);

  const isAdminLoggedIn = user && user.userType === "Admin";
  if (!isAdminLoggedIn) {
    //if user is not logged in as "Admin", redirect to auth page to login
    return res.redirect("/auth");
  }
  next();
};

const examinerAuth = async (req, res, next) => {
  const user = await User.findById(req.session.userId);

  const isExaminerLoggedIn = user && user.userType === "Examiner";
  if (!isExaminerLoggedIn) {
    //if user is not logged in as "Examiner", redirect to auth page to login
    return res.redirect("/auth");
  }
  next();
};

module.exports = {
  driverAuth,
  adminAuth,
  examinerAuth,
};
