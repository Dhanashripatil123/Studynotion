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
     showAllcategorie,
     createCategorie,
     CategoryPageDetails                                         
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
     deleteSubSection,                                            
     creteSubSection
} = require("../controllers/subsection")

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
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
//Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
//Add a sub section to a section
router.post("/addSubSection", auth, isInstructor, creteSubSection)

//TODO: put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategorie)
router.get("/showAllCategory", showAllcategorie)
router.post("/getCategoryPageDetails", CategoryPageDetails)

//***********************************************************
//             Rating and Review
//************************************************************************ */
router.post("/createRating", auth, isStudent,)
router.get("/createRating",getAvergeRating)
router.get("/createRating",getAllRating)

module.exports = router;
