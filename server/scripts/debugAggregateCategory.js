const database = require('../config/database');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const Category = require('../models/Category');

(async () => {
  try {
    await database.connect();
    const categoryId = process.argv[2] || '692c8d463d47d335b7187c85';
    console.log('Debug: categoryId=', categoryId);

    let catObjId = null;
    let isStringCategory = false;
    if (mongoose.Types.ObjectId.isValid(categoryId)) {
      catObjId = mongoose.Types.ObjectId(categoryId);
    } else {
      const matchedCategory = await Category.findOne({ $or: [{ slug: categoryId }, { name: categoryId }] }).exec();
      if (matchedCategory) catObjId = matchedCategory._id;
      else isStringCategory = true;
    }

    const page = 1, pageSize = 1000, skip = 0;

    if (catObjId) {
      const pipeline = [
        { $match: { category: catObjId } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
        { $lookup: { from: 'users', localField: 'instructor', foreignField: '_id', as: 'instructor' } },
        { $unwind: { path: '$instructor', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'ratingandreviews', localField: 'ratingAndReview', foreignField: '_id', as: 'ratings' } },
        { $addFields: { avgRating: { $cond: [ { $gt: [ { $size: '$ratings' }, 0 ] }, { $avg: '$ratings.rating' }, 0 ] } } },
        { $project: { courseId: '$_id', courseName: 1, price: 1, thumbnail: 1, instructorName: { $trim: { input: { $concat: ['$instructor.firstName', ' ', '$instructor.lastName'] } } }, rating: { $round: ['$avgRating', 2] } } }
      ];

      const courses = await Course.aggregate(pipeline).exec();
      const total = await Course.countDocuments({ category: catObjId }).exec();
      console.log('Found', courses.length, 'courses; total=', total);
      if (courses.length) console.dir(courses[0], { depth: null });
    } else if (isStringCategory) {
      const cursor = Course.collection.find({ category: categoryId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
      const coursesRaw = await cursor.toArray();
      console.log('Found raw', coursesRaw.length, 'courses');
      if (coursesRaw.length) console.dir(coursesRaw[0], { depth: null });
    }
    process.exit(0);
  } catch (err) {
    console.error('DEBUG AGGREGATE ERROR:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();