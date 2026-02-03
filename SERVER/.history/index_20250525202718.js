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