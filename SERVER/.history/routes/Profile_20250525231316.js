const router = require("./Payment");

//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getUserDetails)
//Get Enrolled Courses
router.delete("deleteProfile",getEnrolledCourses)
router.delete("deleteProfile",update)

module.exports = router
