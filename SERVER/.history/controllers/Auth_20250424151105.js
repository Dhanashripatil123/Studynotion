const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken");
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
      const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
      console.log(recentOtp);

      //validate OTP 
      if(recentOtp.length == 0){
         //OTP not found
         return res.status(400).json({
          sucess:false,
          message:"OTP not found",
         })
      }else if(otp != recentOtp.otp){
          //Invalid OTP
          return res.status(400).json({
               success:false,
               message:"Invalid otp"
          })
      }
      
      //Hash password

      try{
          let hashpassword = bcrypt.hash(password,8)
      }catch(error){
          return res.status(500).json({
               success:false,
               message:"error in hashing password"
          })
      }
      
      //entry create entry in DB
      
      const profileDetails = await Profile.craete({
          gender:null,
          about:null,
          contactNumber:null,
      });

      const user = await User.create({
          firstName,
          lastName,
          email,
          password:hashedPassword,
          contactNumber,
          accounType,additionalDetails:profileDetails._id,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}.${lastName}`,
      })

      //return res
      return res.status(200).json({
          success:true,
          message:'User creted successfully',
          user,
      });
      
}
 catch (error) {
     console.error(error);
     return res.status(500).json({
          success: false,
          message: 'user cannot be register , please try again again',
     });

}
}


//Login
exports.login = async (res, req) => {
     try {
          //get dat from req body
          const { email, password } = req.body;
          //validation
          if (!email || !password) {
               return res.status(403).json({
                    success: false,
                    message: "All fields are requires,please try again"
               })
          }

          //user check exist or not
          let user = await User.findOne({ email }).populate("additionalDetails");

          if (!user) {
               return response.status(401).json({
                    success: false,
                    message: "user is not registred,please signup first"
               })
          }

          //generate jwt,after password matching
          if (await bcrypt.compare(password, user.password)) {
               const payload = {
                    email: user.email,
                    id: user._id,
                    role: user.role,
               }
               const token = jwt.sign(payload, process.env.JWT_SECRETE, {
                    expiresIn: "2h",
               });
               user.token = token;
               user.password = undefined;

               //create cookie and send response
               const options = {
                    expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
               }
               res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: 'Logged in successfully'
               })

          } else {
               return res.status(401).json({
                    success: false,
                    message: "password is incorrect",
               })
          }

     } catch (error) {
          console.log(error);
          return res.status(500)({
               success: false,
               message: 'Login Failure,please try again',
          })
     }
};

//changePassword
exports.changePassword = async (req, res) => {
   try{     
     //get data from req body
    const {email,password,confirmpassword} = req.body
    //get oldPasswordd, newPassword, confirmnewpassword
     let user = await User.findOne({ password })
     
        if (newpassword !== confirmpassword) {
             return res.status(400).json({
                  success: false,
                  message: "password and ConfirmPassword Value does not match,please try again"
             })
        }

    //validation

    //update pwd in DB
    //send mail - password update
    //return response
   }catch(error){

   }
}


