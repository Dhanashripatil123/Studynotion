const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionId:{
    
  }
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required:true
    }
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
