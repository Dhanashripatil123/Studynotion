//Import the require modules
const express = require("express");
const router = express.Router();

const {capturPayment,verifySignature} = require("../controllers/Payment");
const {auth,isInstructer,isStudent,inAdmin} = require(".p-kiu/middlewares/auth")
router.post("/capturePayment",auth,isStudent,capturPayment)
router.post("/verifySignature",verifySignature)

module.exports = router;