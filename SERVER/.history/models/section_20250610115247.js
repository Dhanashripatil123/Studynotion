const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      
    }
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
