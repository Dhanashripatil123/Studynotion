const mongoose = require ("mongoose");

const tagSchema = new mongoose.Schema({
    firstName:{
         type:String,
         required:true,

    },
    description:{
         type:String,
         required:true,
         trim:true,                                         
    },
    course:{
         type:String,
         required:true,
        ref                                
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

module.exports = mongoose.model("Tags",tagSchema);