const Profile = require("../models/Profil");
const User = require("../models/User");

exports.updateProfile = async(req,res) => {
      try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!dateOfBirth || !about || !contactNumber|| !gender){
               return res.status().json({
                    success                              
               })                                   
        }
        //update profile
        //retun response  
      }catch(err){
          
      }                                            
}