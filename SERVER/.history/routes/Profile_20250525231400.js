const router = require("./Payment");

//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getUserDetails)
//Get Enrolled Courses
router.delete("deleteProfile",auth,getEnrolledCourses)
router.delete("updateDisplayPicture",auth,updateDisplayPicture)

module.exports = router
