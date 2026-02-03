const mongoose = require ("mongoose");

const subSectionSchema = new mongoose.Schema({

    title:{
         type:String,
                        
    },

    timeduration:{
         type:String,
                                               
    },

    videoUrl:{
         type:String,
                                         
    },

   
    },
    courseProgress: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress" ,                                         
      }                                            
    ]
})

module.exports = mongoose.model("User",userSchema);