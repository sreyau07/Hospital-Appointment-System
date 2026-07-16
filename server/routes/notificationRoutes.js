const express = require("express");

const router = express.Router();


const authMiddleware = require("../middleware/authMiddleware");


const {
  getNotifications,
  markAsRead,
  createNotification
} = require("../controllers/notificationController");



// Get notifications
router.get(
  "/",
  authMiddleware,
  getNotifications
);



// Mark notification read
router.put(
  "/:id",
  authMiddleware,
  markAsRead
);



// Create notification
router.post(
  "/create",
  authMiddleware,
  createNotification
);



module.exports = router;