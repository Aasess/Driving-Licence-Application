const mongoose = require("mongoose");

// create a Schema object
const Schema = mongoose.Schema;

// define the Appointment Schema
const appointmenSchema = new Schema({
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true, // new time slots are initially available
  },
});

// define the Appointment Model
const Appointment = mongoose.model("Appointment", appointmenSchema);

module.exports = Appointment;
