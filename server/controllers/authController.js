const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");


// Register
const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;


    const userExists = await User.findOne({
      email
    });


    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    const user = await User.create({

      name,
      email,
      password: hashedPassword,

      role: role || "patient"

    });


    res.status(201).json({

      message: "Registration successful",

      user

    });


  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};




// Login
const login = async (req, res) => {

  try {

    console.log("===== LOGIN API CALLED =====");
    console.log(req.body);

    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      email
    });

    console.log("User found:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", match);



    if (!match) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    res.json({

      message: "Login successful",

      token,

user: {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  profilePhoto: user.profilePhoto,
  specialization: user.specialization,
  experience: user.experience,
  fees: user.fees,
  availableDays: user.availableDays,
  availableSlots: user.availableSlots,
}

    });


  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


const forgotPassword = async (req, res) => {
  try {
      console.log("FORGOT PASSWORD API CALLED");
    console.log(req.body);
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("================================");
    console.log("Generated OTP:", otp);
    console.log("================================");

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Hospital Appointment OTP",
      `Your OTP is ${otp}`
    );

    console.log("OTP sent successfully");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {

  console.log("FORGOT PASSWORD ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message,
  });

}
};



// Verify OTP
const verifyOTP = async (req, res) => {

  try {

    const {
      email,
      otp
    } = req.body;



    const user = await User.findOne({
      email
    });



    if (
      !user ||
      user.otp !== otp ||
      user.otpExpire < Date.now()
    ) {

      return res.status(400).json({

        message: "Invalid OTP"

      });

    }


    res.json({

      message: "OTP verified"

    });


  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};




// Reset Password
const resetPassword = async(req,res)=>{

  try{

    const {
      email,
      newPassword
    }=req.body;


    const user=await User.findOne({
      email
    });


    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }


    user.password =
      await bcrypt.hash(
        newPassword,
        10
      );


    user.otp = undefined;

    user.otpExpire = undefined;


    await user.save();


    res.json({

      message:"Password reset successful"

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};



module.exports = {

  register,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword

};