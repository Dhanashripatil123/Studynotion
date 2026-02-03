
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{    
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
      await mailSender(email,"password Reset Link",
                      `Password Reset Lik ${url}`);
    
      //return responce 
      return res.json({
        sucess:true,
        message:"Email send successfully"
      })
    }catch(error){
       console.log(error);
       return res.status(500).json({
          success:false,
          message:"something went wrong while sending reset pwd mail"
       })
       
    }
}

//resetPassword

exports.resetPassword = async(req,res)=>{
      //data fetch
      const{password,confirmPassword , token} = req.body;
      //validation
      if(password!==confirmPassword){
          return res.json({
            success:false,
            message:"password not matching",
          })
      }
      if(!password || !confirmPassword || token){
         return res.status().json({
            success: false,
            message: "please filled all requ",+
         })
      }
      //get userdetails from db using token
      //if not entry - invalid token 
      //token time check
      //hash pwd
      //password update
      //return response
}

