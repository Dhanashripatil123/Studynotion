const Course = require("../models/Course");
const Tag = require("../models/Categorie");
const User = require("../models/User");
const { uploadImageToCloundinary } = require("../utils/imageUploader")

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
             
            if(!instructorDetails){
                  return res.status(400).json({
                        success: false,
                        message: 'Instructer Details not found',
                  })
            }

            //check given tag iss valid or not
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
            const newCoures = await Cour

      } catch (err) {

      }
}

//
