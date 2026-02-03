const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//createRating
exports.createRating = async(req,res)=>{
    try{                                               
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

if(!alreadyreview){
   return res.status(400).json({
            success:false,
            message:"Student is not enrolled in the course"                                      
        });  
}

    //create rating and review
    const ratingReview = await RatingAndReview.create({
                                 rating,review,
                                 course:courseId,
                                 user:userId
                                });

    //update course with this rating/review
    updatecoursw = await Course.findByIdAndUpdate({_id:courseId},
                                                {
                                                  $push:{
                                                       ratingAndReview: ratingReview,                                             
                                                  },
                                                   },
                                                  {new:true});
                                                
    //return response  
    return res. status(200).json({
         success:true,
         message:"Rating and review create successfully",
         ratingReview,                                       
    })                                          
}
catch(err){
     console.log(error);
     
}


//getAveargeRating
//getAllRating