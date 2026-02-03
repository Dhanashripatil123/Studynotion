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
                   message:"User alrady register"                               
              })
          }

          var otp = otpgenerator.generate(4,{
              upperCaseAlphabets:false,
              lowerCaseAlphabets:false,
              specialChars:false                                    
          });
          console.log("otp generator:-",otp);

          const result = await OTP.findOne({otp:otp});

          while(result){
                 otp = otpgenerator(6,{
                 upperCaseAlphabets:false,
                 lowerCaseAlphabets:false,
                 specialChars:false  
           }); 
             result = await OTP.findOne({ otp: otp });                                    
          }

          const otpPayload = {emil,otp}
          
     }catch(error){

     }                                             
}
