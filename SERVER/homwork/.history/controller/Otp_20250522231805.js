const User = require("../model/User");
const OTP = require("../model/Otp");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")

require("dotenv").config();

exports.sendOTP = async (req,res) => {
     try{
          const {email} = req.body

          const checkemail = await User.findOne({email});

          if(checkemail){
              return res.status(404).json({
                   success:false,
                   message:"User alrady regisret"                               
              })
          }
     }catch(error){

     }                                             
}
