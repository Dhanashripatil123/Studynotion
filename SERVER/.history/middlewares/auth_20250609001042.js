const jwt = require("jsonwebtoken")
require("dotenv").config()
const User  = require("../models/User")

//auth
exports.auth = async(req,res,next) => {
      try{
          //extract token
          const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer"," ");

          //if token missing, then return response
         if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            });
         } 

         //verify the token
         try{
            const decode = a jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.User = decode;
         }catch(err){
               //verification - issue
               return res.status(401).json({
                   success:false,
                   message:'token is invalid'
               }) 
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
           if(req.User.accountType != "Student") {
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
           
           
           if(req.user.accountType != "Student") {
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
exports.isAdmin = async(req,res)=>{   
try {
   console.log("account type:", req.user.accountType);
   if (req.User.accountType != "Admin") {
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
