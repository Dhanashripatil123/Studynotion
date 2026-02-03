const express = require('express');
const router = express.Router();

const {username,email} = require('../controller/Otp');

router.post("/otp",)

router.get("getotp",()=>{
       res.json({
            success:true,
            message:"welcome to the route"                                      
       })                                           
})