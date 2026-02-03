const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    
     email:{
          type:String,
          required:true
     },
     otp:{
         type:String,
         required:true
     },
     createAt:{
         type:Date,
         default:Date.now(),
         expire:5*60
     }
});

module.exports = mongoose.model("Otp",otpSchema);

async function sendverification(email,otp){
     try{
       const mailResponse = await mailsender(email,"verification email from me",otp)
     }catch(){

     }                                             
}