const express = require("express");
const router = express.Router();





const{
    login,
    signup,
    sendotp,
    changePassword                                              
} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword                                              
} = require("../middlewares/auth")
const {sendotp} = require("../middlewares/A")
const {auth} = require("../middlewares/auth")


//Routes for Login , signup and Authentication

//**********************************************************************
//               Authentication routes
//**********************************************************************

//Route for user login
router.post("/login",login)

//Route for user signup
router.post("/signup",signup)

//Route for sending OTP to the user's email
router.post("/sendotp",sendotp)

//Route for Changing the password
router.post("/changepassword",auth,changePassword)

//********************************************************* 
//                            Reset password
//********************************************************** */

//routes for generating a reset password token
router.post("/reset-password-token",resetPasswordToken)

//Route for resetting user's password after verification
router.post("/reset-password",resetPassword)

//Export thr router for use in the main application
module.exports = router