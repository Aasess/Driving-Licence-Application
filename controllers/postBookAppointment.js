const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  const { date, time } = req.body;

  await Appointment.create({
    date,
    time,
    isTimeSlotAvailable: true,
  });

  return res.status(201).json({
    success: true,
    message: "Appointment made available to user successfully",
  });
};
