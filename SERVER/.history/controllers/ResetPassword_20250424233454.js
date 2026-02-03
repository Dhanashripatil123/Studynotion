
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
      //get email from req body
      const email = req.body.email;
      //check user for the email , email validation
      const user = await User.findOne({email:email})
      if(!user){
          return res.status(400).json({
             success:false,
             message:"Your Email is not registered with us"
          });
      }
      //generata token
      const token = Crypto.randomUUID();
      //update user by adding token and expration time
      const updateDeatails = await User.findOneAndUpdate({email:email},{token:token,
                                                  resetPasswordExpire:Date.now() + 5*60*1000},
                                                  {new:true})
      //create url
       const url = `http://localhost:3000/update-password/${token}`
      //send mail containg the url
      awa
      //return responce 
      
      
}

//resetPassword
