// Import the required modules
const express = require("express")
const router = request.Router();

//Import the Cotrollers
//Course Controller Import
const{
     createCourse,
     getAll                                             
}


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
