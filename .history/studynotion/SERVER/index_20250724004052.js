const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoute = require("./routes/Course");

const database = require("./config/database");
const cookiesParser = require("cookie-parser")
const cors = require("cors")

const fileuplad = require("express-fileupload")
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

dotenv.config();
const PORT = process.env.PORT ||  4000;

//database connect
database.connect()

//middleware
app.use(express.json());


app.use(cookiesParser());
app.use(
    cors({
        origin:"http://localhost:300",
        credentials:true                                          
    })                                               
);

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"                                          
    })                                              
)

//cloundinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/payment", paymentRoutes)

//def route

app.get("/" , (req,res)=>{
    return res.json({
        success: true,  
        message:"your server is up running... "                                        
    })
});

app.listen(PORT,()=>{
    console.log(`app is running ${PORT}`);
})