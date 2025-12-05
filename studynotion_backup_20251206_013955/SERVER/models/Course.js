const mongoose = require ("mongoose");

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
  // Sections (course content)
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
  // prefer storing category as ObjectId reference
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // allow a single tag reference (controller uses single tag id)
  tag: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    default: null,
  }],
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
          

