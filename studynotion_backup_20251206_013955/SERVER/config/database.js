
const mongoose = require ("mongoose");

require("dotenv").config();

exports.connect = async() => {
      await mongoose.connect(process.env.MONGODB_URL,{
         ssl: true,
         tlsInsecure: false,
         minPoolSize: 1,
         connectTimeoutMS: 30000,
         serverSelectionTimeoutMS: 30000,
         useNewUrlParser:true,
         useUnifiedTopology :true
      })
      .then(() => console.log("DB Connected Successfully"))
      .catch((error) => {
         console.log("Db connection failed");
         console.error(error);
         process.exit(1);
     })                                           
};