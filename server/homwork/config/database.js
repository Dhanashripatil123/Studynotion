const mongoose = require('mongoose');

require('dotenv').config();

exports.connect = () => {
        mongoose.connect(process.env.mongoose_URL,{
              useNewUrlParser:true,
              useUnifiedTopology:true ,                                   
        })  
        .then(()=>{console.log("DB connected successfuly")})
        .catch((err)=>{
             console.log("DB CONNECTION ISSUE",err);
   });
   
   
}