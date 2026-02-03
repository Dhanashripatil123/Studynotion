const Course = require("../models/Course");
const Tag = require("../models/Categorie");
const User = require("../models/User");
const { uploadImageToCloundinary } = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");

//createCourse handler function
exports.createCourse = async (req, res) => {
      try {

            //fetch data
            const { courseName, courseDescription, whatYouWillLearn, price, tag, category } = req.body;

            //get thumbnail
            const thumbnail = req.files.thumbnail;

            //validation
            if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
                return res.status(400).json({
                   success:false,
                   message:'All filed are required'
                })
            }

            //check for instructor 
            const userId = req.user.id;
            const instructorDetails = await User.findById(userId);
            //console.log("Instructor Details " , instructorDetails);
            //TODO : verify that userId and instructionDetails._id are same or different ?
             
            if(!instructorDetails){
                  return res.status(400).json({
                        success: false,
                        message: 'Instructer Details not found',
                  })
            }

            //check given tag is valid or not
            const tagDetails = await Tag.findOne({name:tag});
            // console.log(await Tag.find());
            // console.log("Matched tagDetails:", tagDetails);
            // console.log("Request Tag:",tag);

      //      if(!tagDetails){
      //             return res.status(400).json({
      //                   success: false,
      //                   message: 'Tag details not found',
      //             })
      //       }

            //Uplaod image to Cloundinary
            const thumbnailImage = await uploadImageToCloundinary(thumbnail,process.env.FOLDER_NAME);

            //create an entry for new Courses
            const newCoures = await Course.create({
                  courseName,
                  courseDescription,
                  instructor:instructorDetails._id,
                  whatYouWillLearn: whatYouWillLearn,
                  price,
                  tag:tagDetails,
                  thumbnail:thumbnailImage.secure_url,
                  category,
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
           

            //return response
            return res.status(200).json({
               success:true,
               message:"Course Created Successfully",
               data:newCoures,
            })

      } catch (error) {
           console.log(error);
           return res.status(500).json({
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
exports.getCoursesDetails = async(req,res)=>{
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
                                      //.populate("rantingAndreviews")
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
      }catch(error){   
            console.log(error);
                            
           console.log("somehing went wrong");
           
      } 
}
