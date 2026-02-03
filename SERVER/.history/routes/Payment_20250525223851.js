//Import the require modules
const express = reuire("express");
const router = express.Router();

const {capturPayment,verifySignature} = require("../controllers/Payment");
const {auth,isInstructer,isStudent,inAdmin} = require