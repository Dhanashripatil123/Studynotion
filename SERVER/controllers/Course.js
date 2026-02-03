const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloundinary } = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");
const { model } = require("mongoose");
const Tag = require("../models/Tag");

//createCourse handler function
exports.createCourse = async (req, res) => {
      try {
            
            
            
            //fetch data
            const { courseName, courseDescription, whatYouWillLearn, price, tag, category } = req.body;

            // debug log incoming payload (helps diagnose 400s)
            console.log('createCourse payload:', {
                  user: req.user ? req.user.id : null,
                  body: req.body,
                      files: Object.keys(req.files || {}).join(',') || null,
                      bodyThumbnail: req.body?.thumbnail || null,
            });

            //get thumbnail (guard if req.files is undefined)
            const thumbnail = req.files?.thumbnail;

                  //validation: require core metadata, but allow optional tag/thumbnail
                  if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category) {
                        return res.status(400).json({
                              success: false,
                              message: 'Missing required fields: courseName, courseDescription, whatYouWillLearn, price, category are required',
                        });
                  }

            //check for instructor 
            const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            console.log("Instructor Details " , instructorDetails);
            //TODO : verify that userId and instructionDetails._id are same or different ?
             
            if(!instructorDetails){
                  return res.status(400).json({
                        success: false,
                        message: 'Instructer Details not found',
                  })
            }

                  //check given tag: find or create
                  let tagDetails = null;
                  if (tag) {
                        tagDetails = await Tag.findOne({ name: tag });
                        if (!tagDetails) {
                              try {
                                    tagDetails = await Tag.create({ name: tag });
                              } catch (err) {
                                    console.error('Failed to create tag:', err);
                              }
                        }
                  }

                  //Upload image to Cloudinary if provided (defensive)
                  let thumbnailImage = { secure_url: "" };
                  if (thumbnail) {
                        try {
                              thumbnailImage = await uploadImageToCloundinary(thumbnail, process.env.FOLDER_NAME);
                        } catch (uploadErr) {
                              console.error('Cloudinary upload failed:', uploadErr && uploadErr.stack ? uploadErr.stack : uploadErr);
                              // proceed without throwing; we'll save empty thumbnail and allow course creation
                              thumbnailImage = { secure_url: "" };
                        }
                  }

                  // If client passed a thumbnail URL in the body (instead of a file), accept it
                  if ((!thumbnailImage.secure_url || thumbnailImage.secure_url === "") && req.body?.thumbnail) {
                        // basic validation: accept if it looks like a URL
                        const maybeUrl = String(req.body.thumbnail || "").trim();
                        if (maybeUrl.startsWith('http://') || maybeUrl.startsWith('https://')) {
                              thumbnailImage.secure_url = maybeUrl;
                        }
                  }

                  // If category is not an ObjectId, try to resolve it to a Category doc by slug/name
                  let categoryIdToUse = category;
                  const mongoose = require('mongoose');
                  if (!mongoose.Types.ObjectId.isValid(category)) {
                        let matchedCategory = await Category.findOne({
                              $or: [{ slug: category }, { name: category }]
                        }).exec();
                        if (matchedCategory) {
                              categoryIdToUse = matchedCategory._id.toString();
                        } else {
                              // create the category if it doesn't exist (provide default description)
                              try {
                                    const newCategory = await Category.create({
                                          name: category,
                                          description: `Auto-created category for ${category}`,
                                          slug: String(category).toLowerCase(),
                                    });
                                    categoryIdToUse = newCategory._id.toString();
                              } catch (catErr) {
                                    console.error('Failed to create category:', catErr);
                                    // leave categoryIdToUse as original value; Course.create will fail validation and return error
                              }
                        }
                  }

                  //create an entry for new Courses
                    const newCoures = await Course.create({
                  courseName,
                  courseDescription,
                  instructor:instructorDetails._id,
                  whatYouWillLearn: whatYouWillLearn,
                  price,
                          tag: tagDetails?._id || null,
                          thumbnail: thumbnailImage.secure_url || req.body?.thumbnail || "",
                          category: categoryIdToUse,
            })

                                    // also push the course id into the Category document (category-wise storage)
                                    try{
                                          if (categoryIdToUse && mongoose.Types.ObjectId.isValid(categoryIdToUse)) {
                                                await Category.findByIdAndUpdate(categoryIdToUse, { $push: { courses: newCoures._id } });
                                          }
                                    }catch(err){
                                          console.error('Failed to update Category with new course:', err);
                                    }

            //add the new courses to the user schema of Instructor
            await User.findByIdAndUpdate(
                  {_id:instructorDetails._id},
                  {
                        $push:{
                              courses: newCoures._id,
                        }
                  },
                  {new:true},
            );
           

            //return response
                        console.log('Course created with id:', newCoures._id);
                        return res.status(200).json({
                              success:true,
                              message:"Course Created Successfully",
                              data:newCoures,
                        })

      } catch (error) {
           console.error('createCourse error:', error && error.stack ? error.stack : error);
           return res.status(500).json({
                 success: false,
                 message: "Failed to create course",
                 error: error.message || String(error),
           });
      }
}

//getAllCourses handler function
exports.showAllCourses = async (req, res) => {
      try {
            // return basic course list
            const allCourses = await Course.find({})
                  .select('courseName price thumbnail instructor ratingAndReview studentEnrolled')
                  .populate('instructor', 'firstName lastName')
                  .exec();

            return res.status(200).json({ success: true, data: allCourses });
      } catch (error) {
            console.error(error);
            return res.status(400).json({
                  success: false,
                  message: "Cannot fetch course data",
                  error: error.message,
            });
      }
}

//getCoursesDetails handler function
exports.getCoursesDetails = async (req, res) => {
      try {
            // Get courseId from the request body
            const { courseId } = req.body;

            // Validate courseId input
            if (!courseId) {
                  return res.status(400).json({
                        success: false,
                        message: "Course ID is required",
                  });
            }

            // Find course details with population
            const courseDetails = await Course.findById(courseId)
                  .populate({
                        path: "instructor",
                        populate: {
                              path: "additionalDetails",
                        },
                  })
                  .populate("category")
                  //.populate("ratingAndReview") // spelling corrected
                  .populate({
                        path: "courseContent",
                        model: "Section",
                        populate: {
                              path: "subSection",
                              model: "SubSection"
                        },
                  })
                  .exec();

            // Validation
            if (!courseDetails) {
                  return res.status(404).json({
                        success: false,
                        message: `Could not find course with ID: ${courseId}`,
                  });
            }

            // Success response
            return res.status(200).json({
                  success: true,
                  message: "Course detail fetched successfully",
                  data: courseDetails,
            });

      } catch (error) {
            console.error("Error fetching course details:", error);
            return res.status(500).json({
                  success: false,
                  message: "Internal server error while fetching course details",
            });
      }
};

// Public course details (used by frontend when not authenticated)
exports.getCourseDetails = async (req, res) => {
      try {
            const { courseId } = req.body;
            if (!courseId) {
                  return res.status(400).json({ success: false, message: 'courseId is required' });
            }

            const courseDetails = await Course.findById(courseId)
                  .populate({
                        path: 'instructor',
                        populate: { path: 'additionalDetails' }
                  })
                  .populate('category')
                  .populate({ path: 'courseContent', model: 'Section', populate: { path: 'subSection', model: 'SubSection' } })
                  .lean()
                  .exec();

            if (!courseDetails) {
                  return res.status(404).json({ success: false, message: 'Course not found' });
            }

            return res.status(200).json({ success: true, message: 'Course details fetched', data: courseDetails });
      } catch (error) {
            console.error('getCourseDetails error:', error && error.stack ? error.stack : error);
            return res.status(500).json({ success: false, message: 'Failed to fetch course details' });
      }
};

// Authenticated full course details (returns gated fields like studentEnrolled)
exports.getFullCourseDetails = async (req, res) => {
      try {
            const userId = req.user?.id;
            const { courseId } = req.body;
            if (!courseId) return res.status(400).json({ success: false, message: 'courseId is required' });

            const courseDetails = await Course.findById(courseId)
                  .populate({ path: 'instructor', populate: { path: 'additionalDetails' } })
                  .populate('category')
                  .populate({ path: 'ratingAndReview', model: 'RatingAndReview' })
                  .populate({ path: 'courseContent', model: 'Section', populate: { path: 'subSection', model: 'SubSection' } })
                  .lean()
                  .exec();

            if (!courseDetails) return res.status(404).json({ success: false, message: 'Course not found' });

            // Mark whether the requesting user is enrolled
            let isEnrolled = false;
            if (userId && Array.isArray(courseDetails.studentEnrolled)) {
                  isEnrolled = courseDetails.studentEnrolled.some(s => String(s) === String(userId));
            }

            return res.status(200).json({ success: true, message: 'Full course details fetched', data: { ...courseDetails, studentEnrolled: courseDetails.studentEnrolled || [], isEnrolled } });
      } catch (error) {
            console.error('getFullCourseDetails error:', error && error.stack ? error.stack : error);
            return res.status(500).json({ success: false, message: 'Failed to fetch full course details' });
      }
};

// Enroll a student into a course (simple enrollment endpoint for free/manual enrollments)
exports.enrollCourse = async (req, res) => {
      try {
            const userId = req.user?.id;
            const { courseId } = req.body;
            console.log(courseId, userId);
            if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
            if (!courseId) return res.status(400).json({ success: false, message: 'courseId is required' });

            const mongoose = require('mongoose');

            const course = await Course.findById(courseId).exec();
            console.log('EnrollCourse: found course:', course ? course._id : null);
            if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

            // ensure studentEnrolled array exists
            course.studentEnrolled = course.studentEnrolled || [];
            if (course.studentEnrolled.some(s => String(s) === String(userId))) {
                  return res.status(200).json({ success: false, message: 'Already enrolled' });
            }

            // push userId; let mongoose cast if possible, but guard invalid ids
            if (mongoose.Types.ObjectId.isValid(userId)) {
                  course.studentEnrolled.push(new mongoose.Types.ObjectId(userId));
            } else {
                  course.studentEnrolled.push(userId);
            }

            await course.save();

            // also add course to user's courses (guard with try/catch so failure doesn't break enrollment)
            try {
                  await User.findByIdAndUpdate(userId, { $addToSet: { courses: course._id } });
            } catch (uErr) {
                  console.error('Failed to update user courses during enroll:', uErr && uErr.stack ? uErr.stack : uErr);
                  // continue — course enrollment succeeded, but user update failed
            }

            return res.status(200).json({ success: true, message: 'Enrolled successfully', data: { courseId: course._id } });
      } catch (error) {
            console.error('enrollCourse error:', error && error.stack ? error.stack : error);
            return res.status(500).json({ success: false, message: 'Failed to enroll', error: error.message || String(error) });
      }
};

// Get courses by category id (public)
exports.getCoursesByCategory = async (req, res) => {
      try {
            const { categoryId } = req.params;
            console.log('getCoursesByCategory called with categoryId:', categoryId);
            if (!categoryId) {
                  return res.status(400).json({ success: false, message: 'categoryId is required' });
            }

            const mongoose = require('mongoose');

            // Pagination parameters
            const page = Math.max(parseInt(req.query.page) || 1, 1);
            const pageSize = Math.max(parseInt(req.query.pageSize) || 12, 1);
            const skip = (page - 1) * pageSize;
            // If categoryId looks like an ObjectId, use it. Otherwise, try to resolve by slug/name.
            let catObjId = null;
            let isStringCategory = false;
            if (mongoose.Types.ObjectId.isValid(categoryId)) {
                  // Construct an ObjectId instance using `new` to avoid the
                  // "Class constructor ObjectId cannot be invoked without 'new'" error
                  catObjId = new mongoose.Types.ObjectId(categoryId);
            } else {
                  // Try to find a Category by slug or name
                  const matchedCategory = await Category.findOne({ $or: [{ slug: categoryId }, { name: categoryId }] }).exec();
                  if (matchedCategory) {
                        catObjId = matchedCategory._id;
                  } else {
                        // category stored as string in some legacy Course docs
                        isStringCategory = true;
                  }
            }

            // If we have an ObjectId, use aggregation to fetch and format results
            if (catObjId) {
                  const pipeline = [
                        { $match: { category: catObjId } },
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: pageSize },
                        // lookup instructor
                        {
                              $lookup: {
                                    from: 'users',
                                    localField: 'instructor',
                                    foreignField: '_id',
                                    as: 'instructor',
                              },
                        },
                        { $unwind: { path: '$instructor', preserveNullAndEmptyArrays: true } },
                        // lookup ratings
                        {
                              $lookup: {
                                    from: 'ratingandreviews',
                                    localField: 'ratingAndReview',
                                    foreignField: '_id',
                                    as: 'ratings',
                              },
                        },
                        // compute average rating
                        {
                              $addFields: {
                                    avgRating: {
                                          $cond: [
                                                { $gt: [{ $size: '$ratings' }, 0] },
                                                { $avg: '$ratings.rating' },
                                                0,
                                          ],
                                    },
                              },
                        },
                        // project required fields
                        {
                              $project: {
                                    courseId: '$_id',
                                    courseName: 1,
                                    price: 1,
                                    thumbnail: 1,
                                    instructorName: { $trim: { input: { $concat: ['$instructor.firstName', ' ', '$instructor.lastName'] } } },
                                    rating: { $round: ['$avgRating', 2] },
                              },
                        },
                  ];

                  const courses = await Course.aggregate(pipeline).exec();
                  const total = await Course.countDocuments({ category: catObjId }).exec();
                  return res.status(200).json({ success: true, data: courses, total, page, pageSize });
            }

            // Fallback: some Course documents may store category as a string (legacy). Query by string equality.
            if (isStringCategory) {
                  // Some legacy Course documents have `category` stored as a plain string while
                  // the Mongoose schema expects an ObjectId. Querying via Mongoose with
                  // `{ category: categoryId }` will attempt to cast `categoryId` to ObjectId
                  // and throw a CastError for values like "web-dev". To avoid that, use
                  // the raw collection cursor (bypasses Mongoose casting) and then populate
                  // instructor names with a separate query.

                  // Use native collection cursor to fetch raw documents matching string category
                  const cursor = Course.collection.find({ category: categoryId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize);
                  const coursesRaw = await cursor.toArray();

                  // Collect instructor ids and load their names in one query
                  const instructorIds = Array.from(new Set(coursesRaw.map(c => c.instructor).filter(Boolean).map(id => id.toString())));
                  let instructorsMap = {};
                  if (instructorIds.length > 0) {
                        const users = await User.find({ _id: { $in: instructorIds } }).select('firstName lastName').lean().exec();
                        instructorsMap = users.reduce((acc, u) => {
                              acc[u._id.toString()] = `${u.firstName || ''} ${u.lastName || ''}`.trim();
                              return acc;
                        }, {});
                  }

                  const out = coursesRaw.map((c) => {
                        const instructorName = c.instructor ? (instructorsMap[c.instructor.toString()] || '') : '';
                        return {
                              courseId: c._id,
                              courseName: c.courseName,
                              price: c.price,
                              thumbnail: c.thumbnail || '',
                              instructorName,
                              rating: 0,
                        };
                  });

                  const total = await Course.collection.countDocuments({ category: categoryId });
                  return res.status(200).json({ success: true, data: out, total, page, pageSize });
            }
      } catch (error) {
            console.error('getCoursesByCategory error:', error && error.stack ? error.stack : error);
            return res.status(500).json({ success: false, message: 'Failed to fetch courses by category' });
      }
};

// Get instructor's courses (authenticated)
exports.getInstructorCourses = async (req, res) => {
      try {
            const userId = req.user && (req.user.id || req.user._id);
            if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

            const courses = await Course.find({ instructor: userId })
                  .select('courseName price thumbnail studentEnrolled')
                  .lean()
                  .exec();

            return res.status(200).json({ success: true, data: courses });
      } catch (err) {
            console.error('getInstructorCourses error:', err && err.stack ? err.stack : err);
            return res.status(500).json({ success: false, message: 'Failed to fetch instructor courses' });
      }
};

// Delete a course (instructor only)
exports.deleteCourse = async (req, res) => {
      try {
            const userId = req.user && (req.user.id || req.user._id);
            const { courseId } = req.body;
            if (!courseId) return res.status(400).json({ success: false, message: 'courseId is required' });

            const course = await Course.findById(courseId).exec();
            if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

            // Ensure the requesting instructor owns the course
            if (!String(course.instructor).equals ? String(course.instructor) !== String(userId) : String(course.instructor) !== String(userId)) {
                  return res.status(403).json({ success: false, message: 'Forbidden: you are not the instructor of this course' });
            }

            // Remove the course document
            await Course.findByIdAndDelete(courseId);

            // Remove reference from instructor's user.courses
            try {
                  await User.findByIdAndUpdate(userId, { $pull: { courses: courseId } });
            } catch (uErr) {
                  console.error('Failed to remove course reference from user:', uErr);
            }

            // Remove reference from category
            try {
                  if (course.category) {
                        await Category.findByIdAndUpdate(course.category, { $pull: { courses: courseId } });
                  }
            } catch (cErr) {
                  console.error('Failed to remove course reference from category:', cErr);
            }

            return res.status(200).json({ success: true, message: 'Course deleted' });
      } catch (err) {
            console.error('deleteCourse error:', err && err.stack ? err.stack : err);
            return res.status(500).json({ success: false, message: 'Failed to delete course' });
      }
};
    