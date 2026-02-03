
const mongoose = require ("mongoose");
const mailsender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
         type:String,
         required:true,
         trim:true,                                         
    },
    otp:{
         type:String,
         required:true,
         trim:true,                                         
    },
    createdAt:{
         type:Date,
         default:Date.now(),
          expires:5*60                                   
    },
   
});

//a function -> to send emails
async function sendVerification(email,otp){
   try{
      const mailResponse = awmailsender(email,"verification Email from StudyNototion",otp)
      console.log("Email send Successfully",mailResponse);
   }catch(error){
      console.log("error occur when sending mail",error);
      throw error;
      
   }
}

otpSchema.pre("save" , async function(next){
    await sendVerification(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);