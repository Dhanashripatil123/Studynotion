const cloundinary = require("cloundinary").v2

exports.uploadImageToCloundinary = async (file,folder,height , quality)=>{
     const options = {folder};
     if(height){
        options.height = height;

     } 
     if(quality){
          options.quality = quality;
     }  
     options.resource_type = "auto";      
     
     return await cloundinary.uploader.upload(file , tempFilePath , options);
}