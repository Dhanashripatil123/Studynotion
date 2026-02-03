//Import the require modules
const express = reuire("express");
const router = express.Router();

const {capturPayment,verifySignature} = require("../controllers/Payment");
const {auth,isInstructer,isStudent,inAdmin} = require("./middleware/auth")
router.post("/capturePayment",auth,isStudent,capturPayment)
router.post("/verifySignature",verifySignature)

module.exports = 