const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();
const paymentRoutes=require("./routes/paymentRoutes");

const connectDB = require("./config/db");



// Database connection
connectDB();


const app = express();



app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hospital-appointment-system-wcom.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");



app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment",paymentRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.get("/api/test-cloudinary", (req, res) => {
  res.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret_length: process.env.CLOUDINARY_API_SECRET
      ? process.env.CLOUDINARY_API_SECRET.length
      : 0,
  });
});

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});