const Appointment = require("../models/Appointment");
const Notification=require("../models/Notification");
  const User = require("../models/User");

// Book Appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctor, appointmentDate, appointmentTime, reason } = req.body;

    const appointment = await Appointment.create({
      patient: req.user.id,
      doctor,
      appointmentDate,
      appointmentTime,
      reason,
    });
    
 

const patient = await User.findById(req.user.id);

await Notification.create({
  user: doctor,
  title: "New Appointment",
  message: `${patient.name} booked an appointment on ${appointmentDate} at ${appointmentTime}.`,
});

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const rescheduleAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.appointmentDate = req.body.appointmentDate;
    appointment.appointmentTime = req.body.appointmentTime;
    appointment.status = "pending";

    await appointment.save();

    res.json({
      message: "Appointment rescheduled successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user.id,
    })
      .populate("patient", "name email")
      .populate("doctor", "name specialization fees");

    console.log(appointments);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get All Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name specialization");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  deleteAppointment,
  rescheduleAppointment,
};