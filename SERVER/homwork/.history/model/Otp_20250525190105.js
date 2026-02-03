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



