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
            if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumb){

            }

      } catch (err) {

      }
}

//
