// Import the required modules
const express = require("express")
const router = express.Router();

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
} = require("../controllers/Categories")

//Section Controller Import
const{
     createSection,
     updatedSection,
     deleteSection                                            
} = require("../controllers/section")

//SubSection Controller Import
const{
     createSubsection,
     updateSubSection,
     deleteSubsection,                                            
     creteSubSection
} = require("../controllers/Subsection")

//Importing Middleware
const {auth,isInstructor,isStudent,isAdmin} = require("../middlewares/auth");

//***************************************************************** */
//                Course routes
//************************************************************************** */

//Courses can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse)
//Add a Section to a course
router.post("/addSection",auth,isInstructor,createSection)
//Update section
router.post("/UpdateSection", auth, isInstructor, updatedSection)
//Delete section
router.post("/deleteSection",auth,isInstructor,deleteSection)
//Edit sub section
router.post("/updateSubSection",auth,isInstructor,)
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
router.get("/createRating",getAllRating)

module.exports = router;
