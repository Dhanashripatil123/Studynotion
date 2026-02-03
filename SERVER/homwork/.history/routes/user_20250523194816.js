const express = require('express');
const router = express.Router();

const {sendOTP} = require('../controller/Otp');



router.("/getotp",sendOTP,(req,res,next)=>{
       res.json({
            success:true,
            message:"welcome to the route"                                      
       })                                           
})