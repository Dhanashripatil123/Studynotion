
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require()

//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{    
      //get email from req body
      const email = req.body.email;

      //check user for this email , email validation
      const user = await User.findOne({email:email})
      if(!user){
          return res.status(400).json({
             success:false,
             message:"Your Email is not registered with us"
          });
      }

      //generata token
      const token = Crypto.randomBytes(20).toString("hex");

      //update user by adding token and expration time
      const UpdateDeatails = await User.findOneAndUpdate({email:email},
                                                        {
                                                         token:token,
                                                         resetPasswordExpire:Date.now() + 5*60*1000
                                                      },
                                                  {new:true})
      //create url
       const url = `http://localhost:3000/update-password/${token}`; 

      //send mail containg the url
      await mailSender(email,"password Reset Link",
                      `Password Reset Link ${url}`);
    
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
     try{    
      //data fetch
      //here we are fetch the token also because we have save a newpassword in user
      const{password,confirmPassword , token} = req.body;
      //validation
      if(password!==confirmPassword){
          return res.json({
            success:false,
            message:"password not matching",
          })
      }
      if(!password || !confirmPassword ){
         return res.status(400).json({
            success: false,
            message: "please filled all requirement",
         })
      }

      //get userdetails from db using token
       
       const userDetails = await User.findOne({token:token});

      //if not entry - invalid token 
      if(!userDetails){
          return res.json({
            success:false,
            message:"token is invalid "
          })
      }

      //token time check
       if(userDetails.resetPasswordExpire < Date.now()){
            return res.json({
                 success:false,
                 message:"Token is expired,please regenrationg your token",
            });
       }

      //hash pwd
      const hashPassword = bcrypt.hash(password,10);

      //password update

      await User.findOneAndUpdate(
          {token:token}, //token for searching user
          {password:hashPassword}, //which vakue is update
          {new:true} //return new value
      );

      //return response

      return res.status(200).json({
         success:true,
         message:"passord reset successful"
      });
   }catch(error){
       console.log(error);
       return res.status(500).json({
         success:false,
         message:"Something went wrong while sending reset pwd mail"
       })
   }
}

