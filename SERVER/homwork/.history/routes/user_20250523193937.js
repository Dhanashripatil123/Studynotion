const express = require('express');
const router = express.Router();

const {username,email} = require('../controller/Otp');

router.post