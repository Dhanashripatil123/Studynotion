const jwt = require("jsonwebtoken")
require("dotenv").config()
//const User  = require("../models/User")

//auth
exports.auth = async(req,res,next) => {
      try{
       console.log("BEFORE TOKEN EXTRACTION");

        // extract token from cookie, body, or Authorization header
        let token = null;
        if (req.cookies && req.cookies.token) token = req.cookies.token;
        if (!token && req.body && req.body.token) token = req.body.token;
        if (!token) {
           const authHeader = req.header("Authorization") || req.headers["authorization"];
           if (authHeader && typeof authHeader === "string") {
              // Expect header like "Bearer <token>"
              const parts = authHeader.split(" ");
              if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
                 token = parts[1];
              }
           }
        }
        console.log("AFTER TOKEN EXTRACTION, token present:", !!token);
          

          // if token missing, then return response
          if(!token){
            return res.status(401).json({
               success:false,
               message:"Token is missing",
            });
          }

         //verify the token
         try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded jwt", decode);
            req.user = decode;
         }catch(err){
               //verification - issue
                  return res.status(401).json({
                     success:false,
                     message:'Token is invalid'
                  });
         }
         next();
       
        }catch(err){
          return res.status(401).json({
             success:false,
              message:"Something went wrong while validating the token",
          });
      }
};

//isStudent
exports.isStudent = async(req,res,next) => {
     try{
           if(req.user.accountType != "Student") {
                return res.status(403).json({
                   success:false,
                   message:'This is a protected route for Instructor only'  
                })                              
           }
           next();

     }catch(err){
        return res.status(500).json({                                            
        success:false,
        message:"User role cannot be verified,please try again" 
     })                                           
}
};

//isInstructor
exports.isInstructor = async(req,res,next)=>{   
 try{
           
           
           if(req.user.accountType != "Instructor") {
                return res.status(400).json({
                   success:false,
                   message:'This is a protected route for Instructor only'  
                });                                  
           }
           next();

     }catch(err){
        return res.status(500).json({                                            
        success:false,
        message:"User role cannot be verified,please try again" 
     });                                          
}
};

//IsAdmin
exports.isAdmin = async(req,res,next)=>{   
try {

   if (req.user.accountType != "Admin") {
      return res.status(400).json({
         success: false,
         message: 'This is a protected route for Instructor only'
      })
   }
   next();

} catch (err) {
   return res.status(500).json({
      success: false,
      message: "User role cannot be verified,please try again"
   })
}
}
