const Course = require("../models/Course");
const Tag = require("../models/Categories");
const User = require("../models/User");
const { uploadImageToCloundinary } = require("../utils/imageUploader")

//createCourse handler function
exports.createCourse = async (req, res) => {
      try {

            //fetch data
            const { courseName, courseDescription, whatYouWillLearn } = req.body;

            //get thumbnail
            const thumbnail = req.files.thumbnailImage;

      } catch (err) {

      }
}

//
