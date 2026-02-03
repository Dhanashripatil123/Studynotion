const Course = require("../models/Course");
const Tag = require("../models/Categorie");
const User = require("../models/User");
const { uploadImageToCloundinary } = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");

//createCourse handler function
exports.createCourse = async (req, res) => {
      try {

            //fetch data
            const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

            //get thumbnail
            const thumbnail = req.files.thumbnailImage;

            //validation
            if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
                return res.status(400).json({
                   success:false,
                   message:'All filed are required'
                })
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

            //check given tag is valid or not
            const tagDetails = await Tag.findById(tag);
            if(!tagDetails){
                  return res.status(400).json({
                        success: false,
                        message: 'Ta details not found',
                  })
            }

            //Uplaod image to Cloundinary
            const thumbnailImage = await uploadImageToCloundinary(thumbnail,process.env.FOLDER_NAME);

            //create an entry for new Courses
            const newCoures = await Course.create({
                  courseName,
                  courseDescription,
                  instructor:instructorDetails._id,
                  whatYouWillLearn: whatYouWillLearn,
                  price,
                  tag:tagDetails._id,
                  thumbnail:thumbnailImage.secure_url,
            })

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
            //update the TAG ka schema
            //TODOO: HW
            await User.findByIdAndUpdate(
                  { _id: instructorDetails._id },
                  {
                        $push: {
                              courses: tag._id,
                        }
                  },
                  { new: true },
            );

            //return response
            return res.status(200).json({
               success:true,
               message:"Course Created Successfully",
               data:newCoures,
            })

      } catch (error) {
           console.loog(error);
           return res.status().json({
                 success: true,
                 message: "failed to create Successfully",
                 error:error.message
           })
      }
}

//getAllCourses handler function

exports.showAllCourses = async(req,res) => {
      try{
            
            const allCourses = await Course.find({courseName:true,
                                                  price:true,
                                                  thumbnail:true,
                                                  instructor:true,
                                                  ratingAndReview:true,
                                                  studentEnrolled:true,
                                                  }) 
                                                  .populate("Instrucor")
                                                  exec();                                 
          
      }catch(error){
           console.log(error);
           return res.status(400).json({
              success:false,
              message:"Cannot fetch course data",
              error : error.message
           })
      }
}

//getCoursesDetails handler function
exports.courseDetails = async(req,res)=>{
      try{
           //get id
           const {courseId} = req.body;
           //find course details
           const getCoursesDetails = await Course.find(
                                      {_id:courseId})
                                      .populate({
                                          path:"instructor",
                                          populate:{
                                                path:"additionalDetails",
                                          }
                                      })
                                      .populate("category")
                                      .populate("rantingAndreviews")
                                      .populate({
                                          path:"courseContent",
                                          populate:{
                                                path:"subSection",
                                          },
                                      })
                                      .exec()

                  //validation
                  if(!courseDetails){
                      return res.status(400).json({
                        success:false,
                        message:`Could not find course with ${courseId}`,
                      });
                  } 
                  //return response 
                  return res.status(200).json({
                           success:true,
                           message:"Course detail fetched successflly",
                           data:courseDetails,
                  })                  
      }catch(err){                   
           log()
      } 
}
