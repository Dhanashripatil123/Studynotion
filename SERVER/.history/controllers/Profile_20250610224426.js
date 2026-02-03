const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");



exports.updateProfile = async(req,res) => {
      try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if( !contactNumber|| !gender || !id){
               return res.status(400).json({
                    success:false,
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
        log
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //TODO:HW delete unroll user from all enrolled courses
        const id1 = req.Course.id;
        const CourseDetails = await Course.findById(id1);
        await CourseDetails.updateMany(
                   
            { $pull: { studentsEnrolled: id } }   // remove user ID from studentsEnrolled array
        );
        //delete user
        await User.findByIdAndDelete({id:id});
      
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
        const Course  = await User.find().populate("studentEnrolled");

        return res.status(200).json({
            success: true,
            message: "Fetched all user details successfully",
            data: Course
        });
    } catch (err) {
        console.error("Error in getUserDetails:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching users"
        });
    } 
}