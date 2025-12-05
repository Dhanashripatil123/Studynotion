const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const Fileupload = require("../models/Fileupload"); 
const translate = require("../")



exports.updateProfile = async(req,res) => {
      try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if( !contactNumber|| !gender || !id){
               return res.status(400).json({success:false,
                    message:"please fill all requirements"                              
               })                                   
        }
        //find profils
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails =  await Profile.findById(profileId);

        //update profile
       profileDetails.dateOfBirth = dateOfBirth;
       profileDetails.about = about;
       profileDetails.gender = gender;
       profileDetails.contactNumber = contactNumber;
       await profileDetails.save(); //here if we have a object then need to only save in db , if object is not then we are use profilsDetails.create()
        //retun response  
        return res.status(200).json({
            success:true,
            message:"Profile Upload successfully",
            profileDetails,
        })
      }catch(error){
         console.log(error);
          return res.status(500).json({
            success:false,
            message:"something went wrong , please try again"                                  
           })
      }                                            
};

//deleteAccount

exports.deleteAccount = async(req,res)=>{
    try{
        //get id
        console.log("Printing Id:",req.user.id);
        
        const id = req.user.id;
        //validation
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
         
        //TODO:HW delete unroll user from all enrolled courses
        // const id1 = req.Course.id;
        // const CourseDetails = await Course.findById(id1);
        // await CourseDetails.updateMany(
                   
        //     { $pull: { studentsEnrolled: id } }   // remove user ID from studentsEnrolled array
        // );
        //delete user
        await User.findByIdAndDelete({_id:id});
        //6847c9a73d183e453659044c
        //return response
   
          return res.status(400).json({
            success:true,
          message:"user deleted successfully"
        })

    }catch(error) {
        console.log(error);
        
        return res.status(400).json({
            success: false,
            message: "something went wrong"
        })

    }
}



exports.getUserDetails = async (req, res) => {
    try {
        const users = await User.find().populate("additionalDetails"); 

        return res.status(200).json({
            success: true,
            message: "Fetched all user details successfully",
            data: users
        });
    } catch (err) {
        console.error("Error in getUserDetails:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching users"
        });
    }
};

exports.getEnrolledCourses = async(req,res)=>{
    try {
         const userId = req.user.id;

          if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "instructor",
          select: "firstName lastName email"
        }
      });

       if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
        // const Course  = await User.find().populate("studentEnrolled");

        // return res.status(200).json({
        //     success: true,
        //     message: "Fetched all user details successfully",
        //     data: Course
        // });

        
    return res.status(200).json({
      success: true,
      message: "Fetched enrolled courses successfully",
      data: user.courses,
    });
    
    } catch (err) {
        console.error("Error in getUserDetails:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching users"
        });
    } 
};

exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);


        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloundinary(file, "codehelp");
        console.log(response);

        //db me entry save krni h 
        const fileData = await Fileupload.create({
            name,
            tags,
            email,
            imageUrl: response.api_secret,

        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Upload",

        })
    }

    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "something went wrong",
        })
    }
}

exports.translate= async (req, res) => {
  try {
    const { text } = req.body; // English text from user
    const result = await translate(text, { to: "hi" }); // hi = Hindi
    res.json({ translatedText: result.text });
  } catch (err) {
    res.status(500).json({ error: "Translation failed" });
  }
};