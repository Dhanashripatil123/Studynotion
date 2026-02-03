const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    
     email:{
          type:String,
          required:true
     },
     otp  

})

module.exports = mongoose.model("Otp",otpSchema);