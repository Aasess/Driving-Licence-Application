const Appointment = require("../models/Appointment");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { date, time, appointmentId, testType } = req.body;
  const userId = req.session.userId;

  try {
    const foundAppointment = await Appointment.findOneAndUpdate(
      { date, time },
      {
        isTimeSlotAvailable: false,
      }
    );
    // if appointment is found then sends sucessfully created appointment to user
    if (foundAppointment) {
      // update appointmentId of user
      await User.findByIdAndUpdate(userId, {
        appointmentId,
        testType,
        appointment: appointmentId,
      });
      return res
        .status(201)
        .json({ success: true, message: "Appointment created successfully" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
