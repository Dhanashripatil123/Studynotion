const mongoose = require ("mongoose");

const courseProgress = new mongoose.Schema({
    courseId:{
         type:mongoose.Schema.Types.ObjectId,
                                                 
    },
    lastName:{
         type:String,
         required:true,
         trim:true,                                         
    },
    email:{
         type:String,
         required:true,
         trim:true,                                         
    },
    password:{
         type:String,
         required:true,
    },
    accountType:{
        type:String,
        enum : ["Admin","Student","Instructor"],
        require:true                                          
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",                                          
      }                                             
    ],
    image:{
       type:String,
       require:true,                                           
    },
    courseProgress: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress" ,                                         
      }                                            
    ]
})

module.exports = mongoose.model("User",userSchema);