const express = require("express");
const app = express();
// const translate = require("@vitalets/google-translate-api");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoute = require("./routes/Course");
// import controller helper for alternate public route
const { getCoursesByCategory } = require("./controllers/Course");

const database = require("./config/database");
const cookiesParser = require("cookie-parser")
const cors = require("cors")

const fileuplad = require("express-fileupload")
const os = require('os');
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT ||  4000;

//database connect
database.connect()

//middleware
app.use(express.json());


app.use(cookiesParser());
// Allow CORS for local dev ports (add 3003 since Vite may pick it)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:4173",
  "https://studynotion-kqfz.onrender.com",
  "https://studynotion-t3kf.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(
    fileuplad({
        useTempFiles: true,
        // Use OS temp dir (works on Windows and Unix)
        tempFileDir: os.tmpdir(),
        limits: { fileSize: 500 * 1024 * 1024 },
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

// Public route (alternate path) to fetch courses by category using categoryId
// Example: GET /api/category/<categoryId>/courses
app.get('/api/category/:categoryId/courses', getCoursesByCategory);
// Also support the /api/v1 prefix (frontend calls /api/v1/category/...)
app.get('/api/v1/category/:categoryId/courses', getCoursesByCategory);

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

exports = app;