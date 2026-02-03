const {instance} = require("../config/razorpay");
const Course = require("../module/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEntrollment} = require("../mail/template/courseEntrollmentEmail");
const { default: mongoose } = require("mongoose");


//capture the payment and initial the Razorpay
exports.capturePayment = async (req,res)=>{
    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;
   //validation
   //valid courseId
    if(!course_id){
       return res.json({
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
                 message:'could not find the course',                               
            });                                      
        }
        //user alredy pay for the same course
        const uid = new mongoose.Types.ObjectId(userId); //convert user string to objectId 
        if(course.studentsEnrolled.includes(uid)){
            return re.status(200).json({
               success:false,
               message:'Student is already entrolled'                                 
            })                                      
        }

     }catch(error){
        console.error(error);
         return re.status(200).json({
             success: false,
             message: 'Student is already entrolled'
         })

     }
    
    
    //create order
    const amount=course.price;
    const currency="INR";

    const options ={
        amount:amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    try{
        //intiate the payment  using rezorpay
        const paymentResponce= await instance.orders.create(options);
        console.log(paymentResponce);
        //return response
        return res.status().json({
            suceess:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course
        });
        
    }catch(error){    
       console.log(error);
       res.json({
        success:false,
        message:"Could not initiate order",
       })
       
    }
    //return response
}