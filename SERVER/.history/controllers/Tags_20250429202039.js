const Tag = require("../models/Tag")

//craete tag ka handler function

exports.createTag = async(req,res) => {
      try{
          const {name,description} = req.body;

          if(!name || !description){
               
          }

      }catch(error){
         return res.status(500).json({
              success:false,
              message:error.message                                    
         })
      }
}