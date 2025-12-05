//Import the require modules
const express = require("express");
const router = express.Router();
// const translate = require("@vitalets/google-translate-api");

const { capturePayment,verifySignature, sendPaymentSuccessEmail} = require("../controllers/Payment");
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");
const { translate } = require("../controllers/Profile");
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", auth,isStudent,verifySignature);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
// router.post("/translate", translate)

module.exports = router;