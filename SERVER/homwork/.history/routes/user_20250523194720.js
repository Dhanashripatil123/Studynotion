const express = require('express');
const router = express.Router();

const {sendOTP} = require('../controller/Otp');

ro

router.get("/getotp",(req,res,next)=>{
       res.json({
            success:true,
            message:"welcome to the route"                                      
       })                                           
})