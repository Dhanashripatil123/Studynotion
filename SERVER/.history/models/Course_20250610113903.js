const mongoose = require ("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
         type:String,
          trim:true,                                         
    },
    courseDescription:{
         type:String,
         required:true,
         trim:true,                                         
    },
    instructor:{
         type:mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User",                                         
    },
  whatYouWillLearn:{
         type:String,
         required:true,
    },
    accountType:{
        type:String,
        enum : ["Admin","Student","Instructor"],
        require:true                                          
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    }],
    courses:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",                                          
      }                                             
    ],

    ratingAndReview:[
     {
       type:mongoose.Schema.Types.ObjectId,
       ref:"RatingAndReting",                                           
    }],

     price: {
      
        type:String,
     } ,
     category : {
      
        type:String,
     } ,

     tag : [  
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
                                                
      }],
      
      studentEnrolled : [{
          type:mongoose.Schema.Types.ObjectId ,
          ref:"User"                                       
      }],
})

module.exports = mongoose.model("course",courseSchema);