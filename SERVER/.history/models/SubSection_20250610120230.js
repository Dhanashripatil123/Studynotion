const mongoose = require ("mongoose");

const subSectionSchema = new mongoose.Schema({

    title:{
         type:String,
         require:true
     },

    timeduration:{
         type:String,
         require: true
     },

    videoUrl:{
         type:String,
        require: true
     },
     subSection: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubSection",
          required: true,
        },
      ],
      

})

module.exports = mongoose.model("Subsection", subSectionSchema);