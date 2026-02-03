const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  
  whatYouWillLearn: {
    type: String,
    required: true,
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  ratingAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],

  price: {
    type: Number,
    default: 0,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      default: null,
    }
  ],

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  thumbnail: {
    type: String,
    default: "",
  },

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
