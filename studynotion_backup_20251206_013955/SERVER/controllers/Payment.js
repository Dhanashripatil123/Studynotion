const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
//const {courseEntrollment} = require("../mail/template/courseEntrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require('crypto') 


exports.capturePayment = async (req, res) => {
    try {
        // ensure razorpay instance configured
        if (!instance) {
            return res.status(503).json({ success: false, message: 'Payment gateway not configured on server' });
        }

        const { courses } = req.body;
        const userId = req.user && req.user.id;

        if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            return res.status(400).json({ success: false, message: 'No courses provided for enrollment' });
        }

        let totalAmount = 0;

        for (const course_id of courses) {
            let course;
            try {
                course = await Course.findById(course_id).exec();
                if (!course) {
                    return res.status(404).json({ success: false, message: `Could not find the course with ID: ${course_id}` });
                }

                const uid = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

                // Course model field is `studentEnrolled` — guard accordingly
                const enrolledArr = Array.isArray(course.studentEnrolled) ? course.studentEnrolled.map(String) : [];
                if (enrolledArr.includes(String(userId))) {
                    return res.status(200).json({ success: false, message: `Student is already enrolled in course ID: ${course_id}` });
                }

                totalAmount += Number(course.price || 0);
            } catch (error) {
                console.error('Error loading course during capturePayment:', error && error.stack ? error.stack : error);
                return res.status(500).json({ success: false, message: error.message || 'Server error' });
            }
        }

        const options = {
            amount: Math.round(totalAmount * 100),
            currency: 'INR',
            receipt: Math.random().toString(36).slice(2),
            notes: { courses: JSON.stringify(courses), userId },
        };

        if (!options.amount || Number(options.amount) <= 0) {
            console.error('capturePayment: invalid amount', options.amount);
            return res.status(400).json({ success: false, message: 'Invalid payment amount', amount: options.amount });
        }

        try {
            const paymentResponse = await instance.orders.create(options);
            console.log('Razorpay order created', paymentResponse);
            return res.status(200).json({ success: true, order: paymentResponse, amount: options.amount, currency: options.currency });
        } catch (error) {
            // Log full error for debugging
            console.error('Could not initiate order - razorpay error:', error && (error.stack || error));
            // Try to extract useful fields from error
            let razorErr = null;
            try {
                if (error && error.error) razorErr = error.error;
                else razorErr = typeof error === 'object' ? JSON.stringify(error) : String(error);
            } catch (ex) {
                razorErr = String(error);
            }
            return res.status(500).json({ success: false, message: 'Could not initiate order', error: razorErr });
        }
    } catch (err) {
        console.error('capturePayment fatal error', err && err.stack ? err.stack : err);
        return res.status(500).json({ success: false, message: 'Failed to capture payment', error: err.message || String(err) });
    }
};

//verify the paymeny
exports.verifySignature = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user && req.user?.id;

    if (!userId) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request data'
        });
    }

    // For verifying Razorpay checkout response, use the Razorpay key secret (not the webhook secret)
    const razorpayKeySecret = process.env.RAZORPAY_SECRET;
    if (!razorpayKeySecret) {
        console.error('verifySignature: missing Razorpay key secret (RAZORPAY_SECRETE / RAZORPAY_SECRET)');
        return res.status(503).json({ success: false, message: 'Payment gateway secret not configured on server' });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    let expectedSignature;
    try {
        expectedSignature = crypto.createHmac('sha256', razorpayKeySecret)
            .update(body.toString())
            .digest('hex');
    } catch (err) {
        console.error('verifySignature: error creating HMAC', err && err.stack ? err.stack : err);
        return res.status(500).json({ success: false, message: 'Failed to verify signature', error: err.message || String(err) });
    }

    if (expectedSignature === razorpay_signature) {
        console.log('Payment is authorized for order:', expectedSignature, razorpay_order_id);
        console.log('Enrolling user ID:', razorpay_signature);
        // enroll the student(s)
        try {
            await entrolledStudent(courses, userId);
            return res.status(200).json({ success: true, message: 'Payment is authorized' });
        } catch (err) {
            console.error('Error enrolling students after payment verification:', err && err.stack ? err.stack : err);
            return res.status(500).json({ success: false, message: 'Failed to enroll after payment', error: err.message || String(err) });
        }
    }

    // signature mismatch — log truncated values to help debugging
    try {
        const truncatedExpected = String(expectedSignature).slice(0, 10) + '...';
        const truncatedReceived = String(razorpay_signature).slice(0, 10) + '...';
        console.warn('verifySignature: signature mismatch', { expected: truncatedExpected, received: truncatedReceived, order: razorpay_order_id });
    } catch (e) { /* ignore logging errors */ }

    return res.status(400).json({ success: false, message: 'Invalid signature' });
}




        // enroll student helper — updates Course.studentEnrolled and User.courses
        const entrolledStudent = async (courseIds, userId) => {
            if (!courseIds || !Array.isArray(courseIds) || courseIds.length === 0 || !userId) {
                throw new Error('Invalid courseIds or userId');
            }

            for (const id of courseIds) {
                try {
                    const course = await Course.findById(id).exec();
                    if (!course) {
                        throw new Error(`Course not found with ID: ${id}`);
                    }

                    // add student if not already present
                    course.studentEnrolled = course.studentEnrolled || [];
                    if (!course.studentEnrolled.map(String).includes(String(userId))) {
                       const studentId = mongoose.Types.ObjectId.isValid(userId) ? new  mongoose.Types.ObjectId(userId) : userId;
                       course.studentEnrolled.push(studentId);
                        await course.save();
                    }

                    // add course to user's courses
                    await User.findByIdAndUpdate(userId, { $addToSet: { courses: course._id } });

                    // send email (best-effort)
                    try {
                        const student = await User.findById(userId).exec();
                        if (student && student.email) {
                            await mailSender(student.email, `Enrolled in ${course.courseName}`, `Hi ${student.firstName}, you are enrolled in ${course.courseName}`);
                        }
                    } catch (mailErr) {
                        console.error('Failed to send enrollment email:', mailErr && mailErr.stack ? mailErr.stack : mailErr);
                    }
                } catch (error) {
                    console.error(`Error enrolling in course ID: ${id}`, error && error.stack ? error.stack : error);
                    throw error;
                }
            }
        };

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { response, amount, token } = req.body;

    const userId = req.user && req.user.id;

    if (!response || !amount || !token) {
        return res.status(400).json({
            success: false,
            message: 'Incomplete payment details'
        });
    }

    try {
        // Fetch user details and send a best-effort confirmation email
        const student = await User.findById(userId).exec();
        if (!student || !student.email) {
            return res.status(400).json({ success: false, message: 'User email not found' });
        }

        await mailSender(
            student.email,
            'Payment Successful for your Course Purchase',
            `Dear ${student.firstName},\n\nYour payment of INR ${amount / 100} has been successfully processed. Your payment ID is ${response.razorpay_payment_id}.\n\nThank you for choosing StudyNotion!\n\nBest regards,\nStudyNotion Team`
        );

        return res.status(200).json({ success: true, message: 'Payment success email sent' });
    } catch (error) {
        console.error('Error sending payment success email', error && error.stack ? error.stack : error);
        return res.status(500).json({ success: false, message: 'Failed to send payment success email' });
    }
};
     
    
    
//     //create order
//     const amount=course.price;
//     const currency="INR";

//     const options ={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     };

//     try{
//         //intiate the payment  using rezorpay
//         const paymentResponce= await instance.orders.create(options);
//         console.log(paymentResponce);
//         //return response
//         return res.status().json({
//             suceess:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponce.id,
//             currency:paymentResponce.currency,
//             amount:paymentResponce.amouunt
//         });
        
//     }catch(error){    
//        console.log(error);
//        res.json({
//         success:false,
//         message:"Could not initiate order",
//        });
       
//     }
//     //return response
// };

// //verify Signature of Razorpay and Server

// exports.verifySignature=async(req,res)=>{
//     const webhookSecrete = "12345678";

//     const signature = req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmac("sha256",webhookSecrete);//step1:get hmac object
//     shasum.update(JSON.stringify(req.body));//step2:convert your sham into string
//     const digest = shasum.digest('hex');//step3: when you run hashing algo on text and get sum output this output is called the digest (this is basically hexadecimal form)

//     if(signature==shasum){
//          console.log("payment is authrorized");

//          const {courseId,userId} = req.body.payload.payment.entity.notes;

//          try{
//               //fulfill the action

//               //find the course and entroll the staudent in it
//               const entrolledCourse = await Course.findOneAndUpdate(  
//                                       {_id:courseId},
//                                       {$push:{studentsEnrolled:userId}},
//                                       {new:true}
//               );

//               if(!entrolledCourse){
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not found',
//                     })
//               }

//               console.log(entrolledCourse);

//               //find the student added the course to their list enrolled courses me
//              const entrolledStudent = await User.findOneAndUpdate(
//                  { _id: userId },
//                  { $push: {courses: courseId } },
//                  { new: true }
//              );
//              console.log(entrolledStudent);

//              //mail send krdo confirmation wala
//              const emailResponse = await mailSender(
//                                    entrolledStudent.email,
//                                    "congrudulation from codehelp, tou are onborded into new codehelp course"
//              );
//               console.log(emailResponse);
//               return res.status(200).json({
//                 success:true,
//                 message:"successfully send email"
//               })
              

//          }catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
            
//          }
         
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"something went wrong"
//         })
//     } }