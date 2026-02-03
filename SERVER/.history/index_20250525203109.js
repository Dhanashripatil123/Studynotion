const express = require("express");
const app = express();

const userRoute = request("./routes/User");
const profileroute = request("./routes/Profile");
const paymentroute = request("./routes/Payment");
const courseRoute = request("./routes/Course");

const database = require("./config/database");
const cookiesParser = require("cookie-parser")
const cors = require("cors")
const {cloundinary} = require("./config/cloundinary")
const fileuplad = require("express-fileupload")
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT ||  4000;

//database connect
database.connect

//middleware
app.use(express.json());
app.use(cookiesParser());
app.use(
                                                  
)