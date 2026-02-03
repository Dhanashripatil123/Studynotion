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
            thumbnail:course.thumbnail,
            orderId:paymentResponce.id,
            currency:paymentResponce.currency,
            amount:paymentResponce.amouunt
        });
        
    }catch(error){    
       console.log(error);
       res.json({
        success:false,
        message:"Could not initiate order",
       });
       
    }
    //return response
};

//verify Signature of Razorpay and Server

exports.verifySignature=async(req,res)=>{
    const webhookSecrete = "12345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256",webhookSecrete);//step1:get hmac object
    shasum.update(JSON.stringify(req.body));//step2:convert your sham into string
    const digest = shasum.digest('hex');//step3: when you run hashing algo on text and get sum output this output is called the digest (this is basically hexadecimal form)

    if(signature==shasum){
         console.log("payment is authrorized");

         const {courseId,userId} = req.body.payload.payment.entity.notes;

         try{
              //fulfill the action

              //find the course and entroll the staudent in it
              const entrolledCourse = await Course.findOneAndUpdate(  
                                      {_id:courseId},
                                      {$push:{studentsEnrolled:userId}},
                                      {new:true}
              );

              if(!entrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:'Course not found',
                    })
              }

              console.log(entrolledCourse);

              //find the student added the course to their list enrolled courses me
             const entrolledStudent = await User.findOneAndUpdate(
                 { _id: userId },
                 { $push: {courses: courseId } },
                 { new: true }
             );
             console.log(entrolledStudent);

             //mail send krdo confirmation wala
             const emailResponse = await mailSender(
                                   entrolledStudent.email,
                                   "congrudulation from codehelp, tou are onborded into new codehelp course"
             );
              console.log(emailResponse);
              return 
              

         }catch(error){

         }
         
    }
};