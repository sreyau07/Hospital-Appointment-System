const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


const {
  getDashboard,
  getAllUsers,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  deleteUser
} = require("../controllers/adminController");



// Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("admin"),
  getDashboard
);



// Get all users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);



// Add Doctor
router.post(
  "/doctors",
  authMiddleware,
  roleMiddleware("admin"),
  addDoctor
);



// Update Doctor
router.put(
  "/doctors/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateDoctor
);



// Delete Doctor
router.delete(
  "/doctors/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteDoctor
);



// Delete User
router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);



module.exports = router;