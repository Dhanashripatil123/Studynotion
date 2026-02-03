const router = require("./Payment");

//Delete user Account
router.delete("/deleteProfile",deleteAccount)
router.put("/updateProfile",auth,deleteAccount)
router.get("/getUser",auth,deleteAccount)
//Get Enrolled Courses
router.delete("deleteProfile",deleteAccount)
router.delete("deleteProfile",deleteAccount)

module.exports = router
