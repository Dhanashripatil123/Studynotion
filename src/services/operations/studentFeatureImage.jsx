// import { studentEndpoint } from "../apiEndpoints/studentEndpoint";
// import { apiConnector } from "../apiconnector";
// import { toast } from "react-hot-toast";
// import { setLoading } from "../../redux/slices/loaderSlice";
// import { resetCart } from "../../redux/slices/cartSlice";

// const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoint;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;    
//     script.onload = () => 
//       resolve(true);
    
//     script.onerror = () =>  resolve(false); 
//     document.body.appendChild(script);
// })
// }

// export async function buyCourse(token,navigate,dispatch) {
//          const toastId = toast.loadScript ('https://checkout.razorpay.com/v1/checkout.js');
//          if(!res){
//           toast.error("Razorpay SDK failed to load. Are you online?");
//           return;
//          }   
         
//          //initiate the order 
//          const orderData = await fetch (COURSE_PAYMENT_API,{
//          {courses}
//          {
//              Authorisation: `Bearer ${token}`
//          })
         
//          if(!orderResponse.data.success){
//            throw new Error('Failed to initiate order');
// }
// //options
// const options = {
//            key: process.env.RAZORPAY_KEY_ID, 
//            amount: `${orderResponse.data.order.amount}`,                                                           ;
//            currency:orderResponse.data.order.currency,
//             name:'Studynotion',
//             description: 'Course Purchase',
//             order_id: orderResponse.data.order.id,
//             image: '/logo.png',
//             prefile:{
//                   name:`${userDetails.firstName} ${userDetails.lastName}`,
//                   email: userDetails.email,
//                   contact: userDetails.contactNumber                                
//             },
//             handler:function(response){
//                  //send successwala mail
//                  sendPaymentSuccessEmail({response,orderResponse.data.message.amount,token});
//                  //verifyPayment
//                  verifyPayment({...response,courses},token,navigate,dispatch);
//             }
//          }

//          const paymentObject = new Window.Razorpay(options)
//          try{  
//          paymentObject.open();
//          paymentObject.on("payment.failed",function(response){
//                toast.error("Oops payment failed")
//                console.log(response.err);
// })
// }catch(error) {
//          console.error('PAYMENT API ERROR', error);
//          toast.error('An error occurred while processing your request. Please try again later.');
// }
// toast.dismiss(toastId);     
// }

// async function sendPaymentSuccessEmail(response,amount,token){
//          try {
//                  await apiConnector(("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
//                        orderId: response.razorpay_order_id,
//                        paymentId: response.razorpay_payment_id,
//                        amount: amount
//                  },{
//                        Authorisation: `Bearer ${token}`
//                  }));                                                                  
//          }catch(err){
//               console.log("PAYMENT SUCCESS EMAIL ERROR....",err);
              
//          }             
// }

// //verify payment
// async function verifyPayment(response,token,navigate,dispatch){
       
//        const toastId = toast.loading('verifying payment.....');                                           try {
//         dispatch(setLoading(true)); 
//            try{
//                  const verifyResponse = await apiConnector("POST",COURSE_VERIFY_API,bodyData{
//                        ...response
//                  },{
//                        Authorisation: `Bearer ${token}`
//                  });

//                  if(!verifyResponse.data.success){
//                        throw new Error('Payment verification failed');
//                  }
//                  toast.success('Payment verified successfully!');
//                  navigate('/dashboard/enrolled-courses');
//                  dispatch(resetCart())
           
//            }catch(err){
//                  console.log("PAYMENT VERIFICATION ERROR....",err);
//                  toast.error('Payment verification failed. Please contact support.');
//            }
//            toast.dismiss(toastId);
//            dispatch(setLoading(false));
//    }
// }
                                                                            
import { studentEndpoint } from "../apiEndpoints/studentEndpoint";
import { apiConnector } from "./apiConnector";
import { toast } from "react-hot-toast";
import { setLoading } from "../../redux/slices/loaderSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoint;

// load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;    
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function buyCourse(courses, token, userDetails, navigate, dispatch) {

  const toastId = toast.loading("Loading payment...");

  // load razorpay script
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("Razorpay SDK failed to load");
    toast.dismiss(toastId);
          return;
         }   
         
  // create order
  let orderResponse;
  try {
    orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );
  } catch (err) {
    toast.error("Order API failed");
    toast.dismiss(toastId);
    return;
  }

  if (!orderResponse.data.success) {
    toast.error("Failed to create order");
    toast.dismiss(toastId);
    return;
  }

  const order = orderResponse.data.order;

  // Razorpay options
const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY, // correct
    amount: order.amount,
    currency: 'INR',
    name: "Studynotion",
    description: "Course Purchase",
    order_id: order.id,
    image: "/logo.png",

    prefill: {
      name: `${userDetails.firstName} ${userDetails.lastName}`,
                  email: userDetails.email,
      contact: userDetails.contactNumber,
            },

    handler: async function (response) {
      // Send Email
      await sendPaymentSuccessEmail(
        response,
        order.amount,
        token
      );

      // Verify Payment
      await verifyPayment(
        { ...response, courses },
        token,
        navigate,
        dispatch
      );
    },
  };

  const paymentObject = new window.Razorpay(options);

         paymentObject.open();

  paymentObject.on("payment.failed", function (response) {
    toast.error("Payment failed");
    console.log("FAILED RESPONSE", response.error);
  });

toast.dismiss(toastId);     
}


async function sendPaymentSuccessEmail(response, amount, token) {
         try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
                       orderId: response.razorpay_order_id,
                       paymentId: response.razorpay_payment_id,
        amount,
      },
      { Authorization: `Bearer ${token}` }
    );
  } catch (err) {
    console.log("EMAIL ERROR:", err);
         }             
}


async function verifyPayment(response, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  dispatch(addToCart(true));

  try {
    const verifyResponse = await apiConnector(
      "POST",
      COURSE_VERIFY_API,
      response,
      { Authorization: `Bearer ${token}` }
    );

    if (!verifyResponse.data.success) {
      throw new Error("Payment verification failed");
                 }

    toast.success("Payment verified!");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (err) {
    console.log("VERIFICATION ERROR:", err);
    toast.error("Payment verification failed");
           }
           toast.dismiss(toastId);
  dispatch(addToCart(false));
}
