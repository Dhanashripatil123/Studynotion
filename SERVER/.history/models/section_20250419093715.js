const mongoose = require ("mongoose");
const SubSection = require("./SubSection");

const sectionSchema= new mongoose.Schema({
   sectionName:{
         type:String,
                                                 
    },

    SubSection:[ 
         {                                             
         type:mongoose.Schema.Types.ObjectId,
         req
         }                                 
    ],

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