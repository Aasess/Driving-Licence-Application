const Appointment = require("../models/Appointment");

module.exports = async (req, res) => {
  const date = req.query?.appointmentDate;

  if (date) {
    // if query params then display slot too
    const foundAppointment = await Appointment.find({ date });

    const appointmentBtns = [
      "9:00",
      "9:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
    ];

    // Extract the 'time' values from foundAppointment
    const occupiedTimes = foundAppointment.map(
      (appointment) => appointment.time
    );

    // Filter appointmentBtns based on occupiedTimes
    const availableTimes = appointmentBtns.filter(
      (time) => !occupiedTimes.includes(time)
    );

    const filterAppointments = availableTimes.map((time) => {
      return {
        time,
        date,
        isTimeSlotAvailable: false,
      };
    });

    const allAppointments = [...foundAppointment, ...filterAppointments];

    res.render("appointment", {
      foundAppointment: allAppointments,
      selectedDate: date,
    });
  } else {
    //if page renders first time
    res.render("appointment", { foundAppointment: null, selectedDate: null });
  }
};
