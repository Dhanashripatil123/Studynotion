
// import { toast } from "react-toastify";
// import { apiConnector } from "../apiconnector";
// import { endpoints } from "../apis";
// //import { setLoading} from "../../slices/authSlice";
// // import { resetCart } from "../../slices/cartSlice";

// const {
//   SENDOTP_API,
//   SIGNUP_API,
//   LOGIN_API,
//   RESETPASSTOKEN_API,
//   RESETPASSWORD_API,
// } = endpoints;

// export function sendOtp(email, navigate) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Sending OTP...");
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", SENDOTP_API, {
//         email,
//         checkUserPresent: true,
//       });
//       console.log("SENDOTP API RESPONSE:", response);
//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }
//       toast.success("OTP Sent Successfully");
//       navigate("/verify-email");
//     } catch (error) {
//       console.log("SENDOTP API ERROR:", error);
//       toast.error("Could Not Send OTP");
//     }
//     dispatch(setLoading(false));
//     toast.dismiss(toastId);
//   };
// }



// export function getPasswordResetToken(email , setEmailSent) {
//   return async(dispatch) => {
//     dispatch(setLoading(true));
//     try{
//       const response = await apiConnector("POST", RESETPASSWORD_API, {email,});

//       console.log("RESET PASSWORD TOKEN RESPONSE....", response);

//       if(!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Reset Email Sent");
//       setEmailSent(true);
//     }
//     catch(error) {
//       console.log("RESET PASSWORD TOKEN Error");
//       toast.error("Failed to send email for resetting password");
//     }
//     dispatch(setLoading(false));
//   }
// }


