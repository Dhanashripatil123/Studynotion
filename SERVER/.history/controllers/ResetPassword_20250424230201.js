
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
             message:"Your Email is not re"
          })
      }
      //generata token
      //update user by adding token and expration time
      //create url
      //send mail containg the url
      //return responce 
      
      const url = 'http://localhost:3000/update-password/${token}'
}

//resetPassword
