const SubSection = require('../models/SubSection');
const CourseProgressModel = require('../models/CourseProgress');

module.exports.updateCourseProgess = async (req, res) => {
   const { courseId, subSectionId } = req.body;
   const userId = req.user && (req.user.id || req.user._id);
   try {
      // check if the subsection is valid
      const subSection = await SubSection.findById(subSectionId);
      if (!subSection) {
         return res.status(404).json({ error: 'Invalid Subsection' });
      }

      // check for existing progress entry
      let courseProgress = await CourseProgressModel.findOne({ userId: userId, courseId: courseId });
      if (!courseProgress) {
         return res.status(404).json({ error: 'No course progress found' });
      }

      // check for re-completing video / subsection
      // model field is `completeVideos` (array) — handle both names defensively
      const completed = courseProgress.completeVideos || courseProgress.completedVideos || [];
      if (completed.includes(subSectionId)) {
         return res.status(200).json({ success: true, message: 'Video already completed', data: courseProgress });
      }

      // update the course progress
      if (!courseProgress.completeVideos) courseProgress.completeVideos = [];
      courseProgress.completeVideos.push(subSectionId);
      await courseProgress.save();

      return res.status(200).json({ success: true, message: 'Progress updated', data: courseProgress });
   } catch (err) {
      console.error('updateCourseProgess error:', err);
      return res.status(500).json({ success: false, error: 'Internal server error' });
   }
};
