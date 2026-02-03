const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")
require("dotenv").config();

//sendOTP
exports.sendOTP = async (req,res) => {
      try{   
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
      var otp = otpgenerator.generate(6,{
         upperCaseAlphabets:false,
         lowerCaseAlphabets:false,
         specialChars:false                                          
      }); 
      console.log("otp generated:",otp);

      //check unique otp or not
      const result = await OTP.findOne({otp: otp});

      while(result){
           otp = otpgenerator(6,{
              upperCaseAlphabets:false,
              lowerCaseAlphabets:false,
              specialChars:false  
           }); 
             result = await OTP.findOne({ otp: otp });                                      
      }

      const otpPayload = {email,otp};

      //create an entry for otp
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody);

      //return response successful
      res.status(200).json({
           success:true,
           message:'OTP Send Successfully',
           otp,
      })
}
catch(error){
     console.log(error);
     return res.status(500).json({
            success:false,
            message:error.message,
     })
}

}

// signup
exports.signup = async (req,res) => {
     try{ 
      //data fetch from req.body      
      const {firstName,lastName,email,password,confirmpassword,accounType,contactNumber,otp} = req.body;
     
      //validate karo
      if(!firstName||!lastName||!email||!password||!confirmpassword||!otp){
         return res.status(403).json({
            success:false,
            message:"All field are required",
         })
      }

      //2 password match karo
      if(password !== confirmpassword){
          return res.status(400).json({
               success:false,
               message:"password and ConfirmPassword Value does not match,please try again"
          })
      }
      
      //check user already exist exist or not
      const existuser = await User.findOne({email});

      if(existuser){
          return res.status(400).json({
               success:false,
               message:"user is alredy exist"
          })
      }

      //find most recent OTP stored for the user
      const recentOtp = await OTP.find({email}).sort({createAt:-1})

      try{
          let hashpassword = bcrypt.hash(password,8)
      }catch(error){
          return res.status(500).json({
               success:false,
               message:"error in hashing password"
          })
      }

      const user = await User.create({
          name,email,password:hashpassword
      })

      return res.status(200).json({
          success:true,
          message:'user creted successfully'
      });
      
}
 catch (error) {
     console.error(error);
     return res.status(500).json({
          success: false,
          message: 'user cannot be register , please try again later',
     });

}
}

//login

//changepassword