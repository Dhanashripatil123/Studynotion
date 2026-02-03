const Ranting = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");

exports.Ranting=(req,res)=>{
     try{
         const {courseId,userId} = req.body;  

         if(!courseId || !userId){
             return res.status().json({
                    success:false,
                    message:"plase fill al requirements"                              
             })
         }

        const newrating = await RatingAndReview.create({userId}) 
     }catch(err){

     }
}
