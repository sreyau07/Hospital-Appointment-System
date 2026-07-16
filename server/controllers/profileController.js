const User = require("../models/User");



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

    user.profilePhoto = req.file.filename;

    await user.save();

    res.json({
      message: "Profile photo uploaded successfully",
      profilePhoto: user.profilePhoto,
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