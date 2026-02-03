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



async function sendverification(email,otp){
     try{
       const mailResponse = await mailsender(email,"verification email from me",otp);
       console.log("successfully send mail",mailResponse);
       
     }catch(error){
       console.log("error occur when se");
       
     }                                             
}

module.exports = mongoose.model("Otp", otpSchema);
