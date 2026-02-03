const express = require("express");
const router = express.Router();

const {
         deleteAccount,
         updateProfile,
        getUserDetails,
        getEnrolledCourses,
        imageUpload,
        instructorDashboard
        } = require("../controllers/Profile"); // Adjust the path as per your project structure
                                                
        const { auth } = require("../middlewares/auth");
//Delete user Account
router.delete("/deleteProfile",auth,deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getUserDetails)
// // //Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/instructorDashboard", auth, instructorDashboard);

//  router.delete("/updateDisplayPicture",auth,updateDisplayPicture)
router.delete("/imageUpload", auth, imageUpload)

module.exports = router;
