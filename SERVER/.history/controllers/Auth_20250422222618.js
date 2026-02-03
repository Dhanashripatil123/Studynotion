const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");

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
                  message: "User already register",                                
             })                                     
      }
     
      //generate otp
      var otp = otpgenerator.gene 
}


// signup

//login

//changepassword