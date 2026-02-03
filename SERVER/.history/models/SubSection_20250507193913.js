const mongoose = require ("mongoose");

const subSectionSchema = new mongoose.Schema({

    title:{
         type:String,
     },

    timeduration:{
         type:Strin},

    videoUrl:{
         type:String,
                                         
    },

   
  
})

module.exports = mongoose.model("Subsection", subSectionSchema);