

import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser  } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  UPDATE_DISPLAY_PICTURE_API
} = endpoints;

// 1. Send OTP
export function sendOtp(email, navigate) {
  
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API , {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE.............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// 2. Sign Up
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
      
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE...........", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

       const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setToken(token));
      dispatch(setUser(user));

      toast.success("Signup Successful");

      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR...........", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// 3. Login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API , {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      const userImage = response.data.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
       console.log("After set user",response.setUser);
       
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify({ ...response.data.user, image: userImage }));

      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR..............", error);
      toast.error("Login Failed");
      navigate("/login")
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// 4. Logout
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}

// 5. Get Password Reset Token
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API ,{ email });

      console.log("RESET PASSWORD TOKEN RESPONSE....", response);
     

      if (response.data.success) {
        throw new Error(response.data.message);
       }
      
      toast.success("Reset Email Sent");
      setEmailSent(true);
    } 
    catch(error) {
      console.log("RESET PASSWORD TOKEN ERROR....", error);
      
      toast.error("Failed to send reset email");
    }

    dispatch(setLoading(false));
  }
}


  export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        });

        console.log("RESET Password RESPONSE ... ", response);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        toast.success("Password has been reset successfully");
      } catch (error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }

      dispatch(setLoading(false));
    };
  }

 export function imageUpload(name,imageUrl,tags,email){
  return async()=>
   {
      try {
        const response = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API, {
          name,
          imageUrl,
          tags,
          email
        })

        console.log("upload password reponse ... ", response);

        if(!response.data.success){
    throw new Error(response.data.message);
  }

  toast.success("image upload successfully");
} catch (error) {
  console.log("UPLOAD  IMAGE Error", error);
  toast.error("Unable to upload image");
}
   }
  
 } 





