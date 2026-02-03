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

//Importing 

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
