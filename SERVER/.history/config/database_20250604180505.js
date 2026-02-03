
const mongoose = require ("mongoose");

require("dotenv").config();

exports.connect = async() => {
      await mongoose.connect(process.env.MONGODB_URL,{
         useNewUrlParser:true,
         useUnifiedTopology :true
      })
      .then(() => console.log("DB Connected Successfully"))
      .catch((error) => {
         console.log("Db connection failed");
         console.consolerror(error);
         process.exit(1);
     })                                           
};