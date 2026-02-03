const express = require('express');
const router = express.Router();

const {username,email} = require('../controller/Otp');



router.get("/getotp",(req,res,next)=>{
       res.json({
            success:true,
            message:"welcome to the route"                                      
       })                                           
})