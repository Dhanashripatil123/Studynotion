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
        const profile = 

        //update profile
        await Profile.findIdAndUbdate();
        //retun response  

      }catch(err){
          
      }                                            
}