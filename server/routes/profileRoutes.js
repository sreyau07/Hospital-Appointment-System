const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");
const upload = require ("../middleware/upload");

const {
  getProfile,
  updateProfile,
  updateProfilePhoto
} = require("../controllers/profileController");



// Get profile
router.get(
  "/",
  authMiddleware,
  getProfile
);



// Update profile
router.put(
  "/update",
  authMiddleware,
  updateProfile
);



// Update profile photo
router.put(
  "/photo",
  authMiddleware,
  upload.single("profilePhoto"),
  updateProfilePhoto
);



module.exports = router;