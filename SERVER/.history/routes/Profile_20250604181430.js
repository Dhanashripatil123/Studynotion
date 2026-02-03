const express = require("express");
const router = express.Router();

const {
         deleteAccount,
         updateProfile,
        getAllUserDetails,
        getEnrolledCourses,
         updateDisplayPicture
        } = require("../controllers/Profile"); // Adjust the path as per your project structure
                                                
        const { auth } = require("../middlewares/auth");
//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getAllUserDetails)
// //Get Enrolled Courses
 router.delete("/getEnrolledCourses",auth,getEnrolledCourses)
// router.delete("/updateDisplayPicture",auth,updateDisplayPicture)

module.exports = router;
