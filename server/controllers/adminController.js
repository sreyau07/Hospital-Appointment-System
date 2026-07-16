const User = require("../models/User");
const Appointment = require("../models/Appointment");
const bcrypt = require("bcryptjs");


// Admin Dashboard
const getDashboard = async (req, res) => {

  try {

    const totalPatients =
      await User.countDocuments({
        role: "patient"
      });


    const totalDoctors =
      await User.countDocuments({
        role: "doctor"
      });


    const totalAppointments =
      await Appointment.countDocuments();


    res.json({

      totalPatients,
      totalDoctors,
      totalAppointments

    });


  } catch(error) {

    res.status(500).json({

      message:error.message

    });

  }

};



// Get All Users
const getAllUsers = async(req,res)=>{

  try{

    const users =
      await User.find()
      .select("-password");


    res.json(users);


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



// Add Doctor
const addDoctor = async(req,res)=>{

  try{


    const doctor =
      await User.create({

        name:req.body.name,

        email:req.body.email,

        password:
          await bcrypt.hash(
            req.body.password,
            10
          ),

        role:"doctor",

        phone:req.body.phone,

        specialization:
          req.body.specialization,

        experience:
          req.body.experience,

        fees:
          req.body.fees,

        availableDays:
          req.body.availableDays,

        availableSlots:
          req.body.availableSlots

      });



    res.status(201).json({

      message:"Doctor Added Successfully",

      doctor

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



// Update Doctor
const updateDoctor = async(req,res)=>{

  try{

    const doctor =
      await User.findById(
        req.params.id
      );


    if(!doctor){

      return res.status(404).json({

        message:"Doctor not found"

      });

    }


    Object.assign(
      doctor,
      req.body
    );


    await doctor.save();



    res.json({

      message:"Doctor Updated Successfully",

      doctor

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



// Delete Doctor
const deleteDoctor = async(req,res)=>{

  try{

    await User.findByIdAndDelete(
      req.params.id
    );


    res.json({

      message:"Doctor Deleted Successfully"

    });


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



// Delete User
const deleteUser = async(req,res)=>{

  try{

    await User.findByIdAndDelete(
      req.params.id
    );


    res.json({

      message:"User deleted successfully"

    });


  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



module.exports = {

  getDashboard,
  getAllUsers,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  deleteUser

};