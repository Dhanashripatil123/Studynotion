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
       console.log("error occur when sending mail",error);
       throw error;
     }                                             
}

otpSchema.pre("save",async function(next){
                                                  await sendVerification(this.email,this.otp);
                                                  next()})

module.exports = mongoose.model("Otp", otpSchema);
