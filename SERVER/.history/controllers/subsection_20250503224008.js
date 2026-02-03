const Subsection = require('../models/SubSection');
const Section = require('../models/section');
const{uploadImageToCloundinary} = require("../utils/imageUploader");

//create Subsection

exports.creteSubSection = async(req,res)=>{
     try{
        //fetch data from req body
        const {sectionId,title,timeDuration,description} = req.body

        //extract file/video
        const video = req.files.videoFile;

        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status().json({
               success:false,
               message:"All fille are required"
            });
        }
        //upload video to cloundinary
        const uploadDatails = await uploadImageToCloundinary(video,process.env.FOLDER_NAME);
        //create a sub-section
        const SubsectionDetails = await Subsection.create({
            title:title,
            timeDuration:timeDuration,
            videoUrl:uploadDatails.secure.url,
        })
        //update section with this sub section ObjectId
        const updateSubSection = await Section.findByIdAndUpdate({_id:sectionId},
                                {$push:{
                                   Subsection:SubsectionDetails._id,
                                }},
                                {new:true});

          // HW : log update section here,after adding populate query                      
          //return response  
          return res.status(200).json({
               success: true,
               message: "craete SubSection is successfully",
               updateSubSection,
          })                    
     }catch(error){
          return res.status(500).json({    
          success: false,
          message: "Internal server error",
          error:error.message
          })
     }
}

//hW : updatesubsection
exports.updatedSubSection =  async(req,res) => {
      try{
          //data input                                        
          const {SubsectionName,SubsectionId} = req.body; 

          //date validation
          if(!sectionName || !SubsectionId){
             return res.status(400).json({
                 success:false,
                message:"missing properties" 
             });
          }

          //Update Date
          const section = await section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

          //return res
            return res.status(500).json({
                success:true,
                message:"successfully updated you section"                                  
            })
          
      } catch(error){
           return res.status(500).json({
                success:false,
                message:"something went wrong,plese try again"                                  
            })
      } ;
      
      
};

//hw: deletesubsection
exports.deleteSection = async(req,res)=>{
     try{
        //get ID - assuming that we are sending ID in params
        const {sectionId} = req.body;
        //use findByIDandDelete
        await section.findByIdAndDelete(sectionId);
      //TODO:do we need to delete the entry from courseschema
        //return response
        return res.status(200).json({
           success:true,
           message:"Selection Deleted successfully",                                       
        })

     }catch(err){
          return res.status(500).json({
                success:false,
                message:"something went wrong,plese try again"                                  
            })
     }
     
};

