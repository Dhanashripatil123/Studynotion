import { toast } from "react-toastify";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// Send OTP
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR:", error);
      toast.error("Could Not Send OTP");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Sign Up
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
    const toastId = toast.loading("Creating Account...");
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

      console.log("SIGNUP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Login
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");

      dispatch(setToken(response.data.token));

      const userImage = response.data.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error("Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// Logout
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

// Request password reset token
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Sending reset link...");

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR:", error);
      toast.error("Failed to send reset email");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
