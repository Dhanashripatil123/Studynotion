const mongoose = require ("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({

    user:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User",                                         
    },

    rating:{
         type:Number,
         required:true,
    },

    review:{
         type:String,
         required:true,
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

module.exports = mongoose.model("RatingandAndReview",ratingAndReviewSchema);