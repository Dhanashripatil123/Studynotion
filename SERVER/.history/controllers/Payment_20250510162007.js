const {instance} = require("../config/razorpay");
const Course = require("../module/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEntrollment} = require("../mail/template/courseEntrollmentEmail");


//capture the payment and initial the Razorpay
exports.capturePayment = async(req,res)=>{
    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;

    //validation
    if(!course_id){
       return res.status().json({
         success:false,
         message:'please provede valid course ID'                                         
       })                                           
    }
    //valid courseDeatils
    let course;
     try{
        course = await course.findById(course_id);
        if(!course){
            return res.status().json({
                 success:false,
                 message                               
            })                                      
        }
     }catch(){}
    //valid userId
    //user alredy pay for the same course 
    //create order
    //return response
}