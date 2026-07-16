const express = require("express");

const router = express.Router();


const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getDoctors,
  getDoctorAppointments,
  updateAppointmentStatus,
  addPrescription,
  updateAvailability,
  updateDoctorPhoto,

} = require("../controllers/doctorController");





// Get all doctors (Patient side)
router.get(
  "/",
  getDoctors
);

router.put(
  "/:id/photo",
  authMiddleware,
  upload.single("profilePhoto"),
  updateDoctorPhoto
);

// Get doctor appointments
router.get(
  "/appointments",
  authMiddleware,
  getDoctorAppointments
);



// Update appointment status
router.put(
  "/appointment/:id",
  authMiddleware,
  updateAppointmentStatus
);

router.put(
  "/availability",
  authMiddleware,
  updateAvailability
);

// Add prescription
router.post(
  "/prescription/:appointmentId",
  authMiddleware,
  addPrescription
);



module.exports = router;