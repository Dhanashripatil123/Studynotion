const database = require('../config/database');
const mongoose = require('mongoose');
const Course = require('../models/Course');

(async () => {
  try {
    await database.connect();
    const categoryId = process.argv[2] || '692c8d463d47d335b7187c85';
    console.log('Querying courses for category:', categoryId);
    const courses = await Course.find({ category: categoryId })
      .populate('instructor', 'firstName lastName')
      .populate('category', 'name')
      .populate('tag', 'name')
      .lean()
      .exec();

    console.log('Found', courses.length, 'courses');
    if (courses.length > 0) {
      console.log('Sample:', JSON.stringify(courses[0], null, 2));
    }
    process.exit(0);
  } catch (err) {
    console.error('Debug script error:', err && err.stack ? err.stack : err);
    process.exit(1);
  }
})();
