const User = require("../models/User");
const OTP = require("../model/OTP");

//sendOTP
exports.sendOTP = async (req,res) => {
      
      //fetch email from request ki body
      const {email} = req.body;
      
      //check if user alredy exist
      const checkUserPresent = await User.findOne({email});

      //if user already exist , then return a response
      if(checkUserPresent){
             return res.status(404).json({
                  success:false,
                  message: "User already register"                                
             })                                     
      }

}


// signup

//login

//changepassword