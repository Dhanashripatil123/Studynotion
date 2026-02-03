
const mongoose = require ("mongoose");
const { exit } = require("process");
require("dotenv").config();

exports.connect = async() => {
      mongoose.connect(process.env.MONGODB_URL,{
         useNewUrlParser:true,
         useUnifiedTopology :true
      })
      .then(() => console.log("DB Connected Successfully"))
      .catch((error) => {
         console.log("Db connection failed");
         console.console.error(error);
         process.exit(1);
     })                                           
};