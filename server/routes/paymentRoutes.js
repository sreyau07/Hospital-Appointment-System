const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  paymentSuccess,
} = require("../controllers/paymentController");

router.post(
  "/create-order",
  authMiddleware,
  createOrder
);

router.put(
  "/success/:id",
  authMiddleware,
  paymentSuccess
);

module.exports = router;