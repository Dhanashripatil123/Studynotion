const {instance} = require("../config/razorpay");
const Course = require("../module/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEntrollment} = require("../mail/template/courseEntrollmentEmail");


//capture the payment and initial the Razorpay
exports.capturePayment = async(req,res)=>{
    //get courseId and userId
    //validation
    //valid courseId
    //valid userId
    //user pay 
    
}