const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/User");

exports.uploadImageToCloundinary = async (file,folder,height , quality)=>{
     const options = {folder};
     if(height){
        options.height = height;

     } 
     if(quality){
          options.quality = quality;
     }  
     options.resource_type = "auto";      
     
     return await cloundinary.uploadImageToCloundinary
}