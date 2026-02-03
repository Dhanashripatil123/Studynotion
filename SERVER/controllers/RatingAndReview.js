const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require('mongoose');

// createRating
exports.createRating = async (req, res) => {
   try {
      // get user id from auth middleware
      const userId = req.user && (req.user.id || req.user._id);

      // accept either `course` or `courseId` from client
      const { rating, review, course, courseId } = req.body;
      const targetCourseId = course || courseId;

      if (!targetCourseId) {
         return res.status(400).json({ success: false, message: 'courseId is required' });
      }

      // check if user is enrolled in the course
      const courseDetails = await Course.findOne({ _id: targetCourseId, studentEnrolled: { $in: [userId] } });
      if (!courseDetails) {
         return res.status(400).json({ success: false, message: 'Student is not enrolled in the course' });
      }

      // check if user already reviewed the course
      const alreadyReview = await RatingAndReview.findOne({ user: userId, course: targetCourseId });
      if (alreadyReview) {
         return res.status(400).json({ success: false, message: 'You have already reviewed this course' });
      }

      // create rating and review
      const ratingReview = await RatingAndReview.create({ rating, review, course: targetCourseId, user: userId });

      // update course with this rating/review (store review id)
      const updatedCourse = await Course.findByIdAndUpdate(
         targetCourseId,
         { $push: { ratingAndReview: ratingReview._id } },
         { new: true }
      );

      return res.status(200).json({ success: true, message: 'Rating and review created successfully', data: ratingReview });
   } catch (error) {
      console.log('createRating error:', error);
      return res.status(500).json({ success: false, message: error.message });
   }
};

//getAveargeRating
exports.getAveargeRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    if (!courseId) return res.status(400).json({ success: false, message: 'courseId is required' });

    const result = await RatingAndReview.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);

    if (result && result.length > 0) {
      return res.status(200).json({ success: true, averageRating: result[0].averageRating });
    }

    return res.status(200).json({ success: true, message: 'Average Rating is 0, no rating given till now', averageRating: 0 });
  } catch (error) {
    console.error('getAveargeRating error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//getAllRating

exports.getAllRating = async (req, res) => {
   try {
      const allReviews = await RatingAndReview.find({})
         .sort({ rating: -1 })
         .populate({ path: 'user', select: 'firstName lastName email image' })
         .populate({ path: 'course', select: 'courseName' })
         .exec();

      return res.status(200).json({ success: true, message: 'All reviews fetched successfully', data: allReviews });
   } catch (err) {
      console.error('getAllRating error:', err);
      return res.status(500).json({ success: false, message: err.message });
   }
};