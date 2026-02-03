const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//createRating
exports.createRating = async(req,res)=>{
    //get user  id
    const {userId} = req.user.;
   
    //fetchdata from req body
    const {user} = req.body;
    //check if user is enrollwd or not
    //check if user already reviewed the course
    //update course 
    //return response                                             
}
//getAveargeRating
//getAllRating