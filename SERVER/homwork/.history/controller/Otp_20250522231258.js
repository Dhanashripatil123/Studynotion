const User = require("../model/User");
const OTP = require("../model/Otp");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
