const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Notification =require("../models/Notification");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Get all doctors
const getDoctors = async (req, res) => {

  try {

    const doctors = await User.find({
      role: "doctor"
    }).select("-password");


    res.json(doctors);


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// Get doctor appointments
const getDoctorAppointments = async (req, res) => {

  try {

    const appointments =
      await Appointment.find({
        doctor: req.user.id
      })
      .populate(
        "patient",
        "name email phone"
      )
      .sort({createdAt: -1});


    res.json(appointments);


  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};


const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    appointment.status = req.body.status;
    await appointment.save();

    await Notification.create({
      user: appointment.patient,
      title: "Appointment Update",
      message: `Your appointment has been ${req.body.status}.`,
    });

    res.json({
      message: `Appointment ${req.body.status} successfully`,
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Add Prescription
const addPrescription = async(req,res)=>{

  try{

    const appointment =
      await Appointment.findById(
        req.params.appointmentId
      );


    if(!appointment){

      return res.status(404).json({
        message:"Appointment not found"
      });

    }


    appointment.prescription =
      req.body.prescription;


    await appointment.save();



    res.json({

      message:"Prescription added successfully",

      appointment

    });



  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};


const updateAvailability = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    doctor.availableDays = req.body.availableDays;
    doctor.availableSlots = req.body.availableSlots;

    await doctor.save();

    res.json({
      message: "Availability updated successfully",
      doctor,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateDoctorPhoto = async (req, res) => {
  try {
    const doctor = await User.findById(req.user.id);
    console.log("===== Doctor Upload =====");
console.log("Cloud:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Key:", process.env.CLOUDINARY_API_KEY);
console.log(
  "Secret Loaded:",
  process.env.CLOUDINARY_API_SECRET ? "YES" : "NO"
);

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "hospital-appointment/doctor-photos",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);
      });

    const result = await uploadFromBuffer();

    doctor.profilePhoto = result.secure_url;

    await doctor.save();

    res.json({
      message: "Doctor photo uploaded successfully",
      profilePhoto: result.secure_url,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {

  getDoctors,
  getDoctorAppointments,
  updateAppointmentStatus,
  addPrescription,
  updateAvailability,
  updateDoctorPhoto,

};