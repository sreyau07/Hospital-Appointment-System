const User = require("../models/User");

const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Get Profile
const getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");


    if (!user) {

      return res.status(404).json({

        message:"User not found"

      });

    }


    res.json(user);



  } catch(error) {

    res.status(500).json({

      message:error.message

    });

  }

};




// Update Profile
const updateProfile = async(req,res)=>{

  try{


    const user =
      await User.findById(
        req.user.id
      );


    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }



    user.name =
      req.body.name || user.name;


    user.phone =
      req.body.phone || user.phone;



    await user.save();



    res.json({

      message:"Profile updated successfully",

      user

    });



  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};


const updateProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
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
            folder: "hospital-appointment/profile-photos",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

    const result = await uploadFromBuffer();

    user.profilePhoto = result.secure_url;

    await user.save();

    res.json({
      message: "Profile photo uploaded successfully",
      profilePhoto: result.secure_url,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {

  getProfile,
  updateProfile,
  updateProfilePhoto

};