const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        console.log("\n SEND OTP REQUEST ");
        // fetch email from request body
        const { email } = req.body;
        console.log("Email received:", email);

        // check if user already exists
        const checkUserPresent = await User.findOne({ email });

        // if user already exists, return a response
        if (checkUserPresent) {
            console.log("User already exists with email:", email);
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        console.log("User does not exist. Generating OTP...");

        // generate otp (6 digits). make options explicit so the library always
        // includes digits and never attempts to return a shorter string. the
        // value will remain a string (not a number) so leading zeros aren’t lost.
        let otp = otpgenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated:", otp, "type", typeof otp, "length", otp.length);

        // check if otp is unique
        let result = await OTP.findOne({ otp: otp });

        let attempts = 0;
        const maxAttempts = 10;
        while (result && attempts < maxAttempts) {
            otp = otpgenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("Regenerated OTP:", otp, "len", otp.length);
            result = await OTP.findOne({ otp: otp });
            attempts++;
        }
        console.log("Generated OTP:", otp);
        console.log("Length:", otp.length);

        if (result) {
            console.error("Failed to generate unique OTP after", maxAttempts, "attempts");
            return res.status(500).json({
                success: false,
                message: "Failed to generate OTP. Please try again.",
            });
        }

        console.log("OTP is unique. Saving to database...");

        const otpPayload = { email, otp };

        // create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("✅ OTP saved in DB:", otpBody._id);

        // send email with proper error handling
        console.log("\nSending OTP email...");
        try {
            const { mailSender } = require("../utils/mailSender");
            const subject = "StudyNotion - Email Verification";
            // Email template with OTP
            const emailTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
                    .container { max-width: 600px; margin: 20px auto; background-color: white; padding: 20px; border-radius: 8px; }
                    .header { color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
                    .code-box { background-color: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center; }
                    .otp-code { font-size: 36px; font-weight: bold; color: #0066cc; letter-spacing: 5px; }
                    .footer { color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Email Verification</div>
                    <p>Welcome to StudyNotion!</p>
                    <p>Your verification code is:</p>
                    <div class="code-box">
                        <div class="otp-code">${otp}</div>
                    </div>
                    <p>This code will expire in 5 minutes.</p>
                    <p>If you didn't request this code, you can safely ignore this email.</p>
                    <div class="footer">
                        <p>StudyNotion Team</p>
                    </div>
                </div>
            </body>
            </html>
            `;

            const info = await mailSender(email, subject, emailTemplate);
            console.log(" Email sent unsuccessfully!");
            console.log("Mail info:", info);

            // success - only return success if email was actually sent
            return res.status(200).json({
                success: true,
                message: "OTP sent to the email ddd",
            });
        } catch (mailErr) {
            console.error("\n❌ Failed to send OTP email!");
            console.error("Mail error message:", mailErr && mailErr.message ? mailErr.message : String(mailErr));
            console.error("Full error:", mailErr);

            // cleanup: remove the OTP we created since email failed
            try {
                await OTP.deleteOne({ _id: otpBody._id });
                console.log("Deleted failed OTP from database");
            } catch (delErr) {
                console.error("Failed to delete OTP after mail error:", delErr && delErr.message ? delErr.message : delErr);
            }

            return res.status(502).json({
                success: false,
                message: "Failed to send OTP email. Please try again.",
                error: mailErr && mailErr.message ? mailErr.message : String(mailErr),
            });
        }
    } catch (error) {
        console.error("\n❌ SEND OTP caught error:");
        console.error("Error:", error && error.message ? error.message : String(error));
        console.error("========== SEND OTP FAILED ==========\n");
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send OTP",
        });
    }
};

// signup
exports.signup = async (req,res) => {
     try{ 
      //data fetch from req.body      
     const { firstName, lastName, email, password, confirmPassword,accountType,otp} = req.body;
      console.log("body:",req.body);
      console.log("password received:",req.body.password);
      
          // Log all received fields for debugging
          console.log("Received signup fields:");
          console.log("accountType:", accountType);
          console.log("firstName:", firstName);
          console.log("lastName:", lastName);
          console.log("email:", email);
          console.log("password:", password);
          console.log("confirmPassword:", confirmPassword);
          console.log("otp:", otp);
      
      //validate karo
          if (
               !accountType?.trim() ||
               !firstName?.trim() ||
               !lastName?.trim() ||
               !email?.trim() ||
               !password?.trim() ||
               !confirmPassword?.trim() ||
               !otp?.trim()
          ) {
         return res.status(403).json({
            success:false,
            message:"All field are required",
         })
      }

      //2 password match karo
          if (password !== confirmPassword){
          return res.status(400).json({
               success:false,
               message:"password and ConfirmPassword Value does not match,please try again"
          })
      }
      
      //check user already exist exist or not
      const existuser = await User.findOne({email});

      if(existuser){
          return res.status(400).json({
               success:false,
               message:"user is alredy exist"
          })
      }

               // find most recent OTP stored for the user
               const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
               console.log("recentOtp:", recentOtp);

               // validate OTP
               if (!recentOtp || recentOtp.length === 0) {
                    return res.status(400).json({ success: false, message: "OTP not found" });
               }

               const latest = recentOtp[0];
               if (String(otp).trim() !== String(latest.otp).trim()) {
                    return res.status(400).json({ success: false, message: "Invalid otp" });
               }
      
      //Hash password
          
          let hashedPassword;
          try {
               hashedPassword = await bcrypt.hash(password, 10);
          } catch (error) {
               return res.status(500).json({
                    success: false,
                    message: "Error in hashing password",
               });
          }

      
      //entry create entry in DB
      
      const profileDetails = await Profile.create({
          gender:null,
          dateOfBirth:null,
          about:null,
          contactNumber:null,
      });

      const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          accountType,
          additionalDetails:profileDetails._id,
          image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}.${lastName}`,
      })

      //return res
      return res.status(200).json({
          success:true,
          message:'User creted successfully',
          user,
      });
      
}
 catch (error) {
     console.error(error);
     return res.status(500).json({
          success: false,
          message: 'user cannot be registred , please try again again',
     });
   
     

}
}


//Login
exports.login = async (req,res) => {
     try {
          //get data from req body
          const { email, password } = req.body;

          console.log("email",email);
          console.log("password",password);
          

          //validation
          if (!email || !password) {
               return res.status(403).json({
                    success: false,
                    message: "All fields are requires,please try again"
               })
          }

          //user check exist or not
          let user = await User.findOne({ email }).populate("additionalDetails");

          if (!user) {
               return response.status(401).json({
                    success: false,
                    message: "user is not registred,please signup first"
               });
          }

          //generate jwt,after password matching
          if (await bcrypt.compare(password, user.password)) {
               const payload = {
                    email: user.email,
                    id: user._id,
                    accountType: user.accountType,
               }
               const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    
                    expiresIn: "2h",
               });
             

               user.token = token;
               user.password = undefined;

               //create cookie and send response
               const options = {
                    expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    sameSite: 'lax',
               }
               res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: 'Logged in successfully'
               })

          } else {
               return res.status(401).json({
                    success: false,
                    message: "password is incorrect",
               })
          }

     } catch (error) {
          console.log(error);
          
          return res.status(500).json({
               success: false,
               message: 'Login Failure,please try again',
          })
     }
};

//changePassword

exports.changePassword = async (res,req) => {
     try {
          const { email, oldPassword, newpassword, confirmpassword } = req.body;

          if (!email || !oldPassword || !newpassword || !confirmpassword) {
               return res.status(400).json({ success: false, message: "All fields are required" });
          }

          if (newpassword !== confirmpassword) {
               return res.status(400).json({ success: false, message: "Passwords do not match" });
          }

          const user = await User.findOne({ email });
          if (!user) {
               return res.status(404).json({ success: false, message: "User not found" });
          }

          const isMatch = await bcrypt.compare(oldPassword, user.password);
          if (!isMatch) {
               return res.status(401).json({ success: false, message: "Old password is incorrect" });
          }

          const hashedPassword = await bcrypt.hash(newpassword, 8);
          user.password = hashedPassword;
          await user.save();

          res.status(200).json({ success: true, message: "Password changed successfully" });
     } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Server error" });
     }
}



  

