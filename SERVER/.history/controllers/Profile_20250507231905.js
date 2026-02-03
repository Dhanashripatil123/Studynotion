const Profile = require("../models/Profil");
const User = require("../models/User");

exports.updateProfile = async(req,res) => {
      try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if( !contactNumber|| !gender || !id){
               return res.status().json({
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
        return res.status(400).json({
            success:true,
            message:"Profile Upload successfully",
            profileDetails,
        })
      }catch(err){
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
        const id = req.user.id;
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return
        }
    }catch(){

    }

}