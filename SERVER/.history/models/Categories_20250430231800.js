const mongoose = require ("mongoose");

const CategorieSchema = new mongoose.Schema({
    firstName:{
         type:String,
         required:true,

    },
    description:{
         type:String,
         required:true,
         trim:true,                                         
    },
    course:{
         type:String,
         required:true,
         ref:"Course",                                
    },
    password:{
         type:String,
         required:true,    
     },
  
})

module.exports = mongoose.model("Tags",CategorieSchema);