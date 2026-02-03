




const{
    login,
    signup,
    sendotp,
    changePassword                                              
} = require("../controllers/Auth")
const {
    resetPasswordToken,
    resetPassword                                              
} = require("../middlewares/Password")

const {auth} = require("../middlewares/auth")
const router = require("./Payment")

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
route