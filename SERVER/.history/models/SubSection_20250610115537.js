const mongoose = require ("mongoose");

const subSectionSchema = new mongoose.Schema({

    title:{
         type:String,
         require:true
     },

    timeduration:{
         type:String
     },

    videoUrl:{
         type:String,
     },

})

module.exports = mongoose.model("Subsection", subSectionSchema);