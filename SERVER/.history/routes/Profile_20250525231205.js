const router = require("./Payment");

//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,deleteAccount)
//Get Enrolled Courses
router.delete("deleteProfile",deleteAccount)
router.delete("deleteProfile",deleteAccount)

module.exports = router
