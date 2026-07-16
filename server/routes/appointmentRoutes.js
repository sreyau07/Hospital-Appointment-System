const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getMyAppointments,
  getAllAppointments,
  cancelAppointment,
  deleteAppointment,
  rescheduleAppointment,
} = require("../controllers/appointmentController");


// Book Appointment
router.post(
  "/book",
  authMiddleware,
  bookAppointment
);


// Get My Appointments
router.get(
  "/my",
  authMiddleware,
  getMyAppointments
);


// Get All Appointments (Admin)
router.get(
  "/all",
  authMiddleware,
  getAllAppointments
);


// Cancel Appointment
router.put(
  "/cancel/:id",
  authMiddleware,
  cancelAppointment
);


// Delete Appointment
router.delete(
  "/:id",
  authMiddleware,
  deleteAppointment
);

router.put(
  "/reschedule/:id",
  authMiddleware,
  rescheduleAppointment,
);

module.exports = router;