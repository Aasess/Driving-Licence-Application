const signupUser = require("./signupUser");
const loginUser = require("./loginUser");
const home = require("./home");
const licenseG2 = require("./licenseG2");
const licenseG = require("./licenseG");
const auth = require("./auth");
const addUser = require("./addUser");
const fetchUser = require("./fetchUser");
const updateUser = require("./updateUser");
const logout = require("./logout");
const appointment = require("./appointment");
const postBookAppointment = require("./postBookAppointment");
const availableSlots = require("./availableSlots");
const postAppointmentSlotDriver = require("./postAppointmentSlotDriver");
const examiner = require("./examiner");
const examinerTestTypeSelect = require("./examinerTestTypeSelect");
const examinerReview = require("./examinerReview");
const driverStatusAdmin = require("./driverStatusAdmin");
const driverReview = require("./driverReview");

module.exports = {
  signupUser,
  loginUser,
  home,
  licenseG2,
  licenseG,
  auth,
  addUser,
  fetchUser,
  updateUser,
  logout,
  appointment,
  postBookAppointment,
  availableSlots,
  postAppointmentSlotDriver,
  examiner,
  examinerTestTypeSelect,
  examinerReview,
  driverStatusAdmin,
  driverReview,
};
