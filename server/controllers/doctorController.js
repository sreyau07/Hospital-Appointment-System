const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Notification =require("../models/Notification");



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

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No image selected",
      });
    }

    doctor.profilePhoto = req.file.filename;

    await doctor.save();

    res.json({
      message: "Photo uploaded successfully",
      profilePhoto: doctor.profilePhoto,
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