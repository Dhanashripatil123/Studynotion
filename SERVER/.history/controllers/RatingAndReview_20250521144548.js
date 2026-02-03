const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//createRating
exports.createRating = async(req,res)=>{
    //get user  id
    const userId = req.user.id;
   
    //fetchdata from req body
    const {rating,review,courseId} = req.body;
    //check if user is enrollwd or not
    const CourseDatails = await Course.findOne(
                             {_id:courseId,
                              studentEnrolled:{$elementMatch:{$eq:userId}}                    
                              });
    if(!courseDeatils){
        return res.status(400).json({
            success:false,
            message:"Student is not enrolled in the course"                                      
        })                                          
    }   

    //check if user already reviewed the course
    const alreadyreview = await RatingAndReview.findOne({ 
                            user:useId,  
                            course:courseId,                  
});
    //update course 
    //return response                                             
}
//getAveargeRating
//getAllRating