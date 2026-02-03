const express = require("express");
const router = express.Router();


//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getAllUserDetails)
//Get Enrolled Courses
router.delete("/getEnrolledCourses",auth,getEnrolledCourses)
router.delete("/updateDisplayPicture",auth,updateDisplayPicture)

module.exports = router;
