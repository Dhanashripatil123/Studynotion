

import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser  } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";


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

      if (!response?.success) {
        throw new Error(response?.message || "Could not send OTP");
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
export function signUp (
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

      if (!response?.success) {
        throw new Error(response?.message || "Signup failed");
      }

      const { token, user } = response;
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

      if (!response?.success) {
        throw new Error(response?.message || "Login failed");
      }

      toast.success("Login Successful");

      dispatch(setToken(response.token));

      const userImage = response.user?.image
        ? response.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`;

      dispatch(setUser({ ...response.user, image: userImage }));
      console.log("After set user", response.user);

      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("user", JSON.stringify({ ...response.user, image: userImage }));

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

      if (!response?.success) {
        throw new Error(response?.message || "Could not send reset email");
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

        if (!response?.success) {
          throw new Error(response?.message || "Could not reset password");
        }

        toast.success("Password has been reset successfully");
      } catch (error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }

      dispatch(setLoading(false));
    };
  }

 export function imageUpload(email, name, file){
  return async(dispatch, getState) => {
    try {
      const formData = new FormData();
      if (file instanceof File) {
        formData.append('file', file);
      } else if (typeof file === 'string') {
        formData.append('imageUrl', file);
      }
      if (email) formData.append('email', email);
      if (name) formData.append('name', name);

      const resp = await apiConnector("POST", UPDATE_DISPLAY_PICTURE_API, formData, { 'Content-Type': 'multipart/form-data' });

      console.log("upload image response ... ", resp);

      if (!resp?.success) {
        throw new Error(resp?.message || "Image upload failed");
      }

      // Try to extract a new image URL or user object from response
      const newImage = resp?.data?.image || resp?.image || resp?.data || resp?.user?.image;
      const updatedUser = resp?.user || null;

      // If server returned a full user, store that. Otherwise update existing local user with new image
      if (updatedUser) {
        const userImage = updatedUser.image || (typeof newImage === 'string' ? newImage : updatedUser.image);
        const userToStore = { ...updatedUser, image: userImage };
        dispatch(setUser(userToStore));
        localStorage.setItem('user', JSON.stringify(userToStore));
      } else if (newImage) {
        try {
          const existingUser = JSON.parse(localStorage.getItem('user')) || {};
          const userToStore = { ...existingUser, image: newImage };
          dispatch(setUser(userToStore));
          localStorage.setItem('user', JSON.stringify(userToStore));
        } catch (e) {
          console.warn('Could not parse existing user from localStorage', e);
        }
      }

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.log("UPLOAD IMAGE Error", error);
      toast.error("Unable to upload image");
    }
  }
 }





