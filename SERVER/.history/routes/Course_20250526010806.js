// Import the required modules
const express = require("express")
const router = request.Router();

//Import the Cotrollers
//Course Controller Import
const{
     createCourse,
     getAllCourses,
     getCourseDetails                                             
} = require("../controllers/Course")

//Categories Controller Import
const {
   showAllCategories,
   createCategory,
   categoryPageDetails                                            
} = request("../controllers/Categories")

//Section Controller Import
const{
     createSection,
     updateSection,
     deleteSection                                            
} = require("../controllers/section")

//SubSection Controller Import
const{
     createSubsection,
     updateSubsection,
     deleteSubsection                                            
} = require("../controllers/Subsection")

//Importing Middleware
const {auth,isInstructor,isStudent,isAdmin} = require("../middlewares/auth");

//***************************************************************** */
//                Course routes
//************************************************************************** */

//Courses can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse)
//Add a Section to a course
router.post("/addSection",auth,isInstructor,createCourse)
//Update section
router.post("/UpdateSection",auth,isInstructor,updateSection)
//Delete section
router.post("/deleteSection",auth,isInstructor,)
//Edit sub section
router.post("/updateSubSection",auth,isInstructor,updateSubsection)
//Delete Sub Section
router.post("/deleteSubSection",auth,isInstructor,deleteSubsection)
//Add a sub section to a section
router.post("/addSubSection",auth,isInstructor,createSubsection)

//TODO: put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategory",showAllCategory)
router.post("/getCategoryPageDetails",categoryPageDetails)

//***********************************************************
//             Rating and Review
//************************************************************************ */
router.post("/createRating",auth,isStudent,createRating)
router.get("/createRating",getAvergeRating)
router.get("/createRating",getAllRatingReview)

module.exports = router;
