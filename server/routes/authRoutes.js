const express = require("express");

const router = express.Router();


const {
  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword
} = require("../controllers/authController");



// Register
router.post(
  "/register",
  register
);


// Login
router.post(
  "/login",
  login
);


// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);


// Verify OTP
router.post(
  "/verify-otp",
  verifyOTP
);


// Reset Password
router.post(
  "/reset-password",
  resetPassword
);



module.exports = router;