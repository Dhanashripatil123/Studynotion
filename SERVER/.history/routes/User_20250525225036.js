




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
               Authentication routes