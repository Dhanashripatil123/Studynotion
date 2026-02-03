const section = require("../models/section");
const Course = require ("../models/Course");
const { response } = require("express");
const section = require("../models/section");

exports.createSection = async (req,res) => {
      try{
         //data fetch
         const {sectionName,courseId} = req.body;
         //data validation
         if(!sectionName || !courseId){
             return res.status(400).json({
                success:false,
                message:"fill all requirements",
             });
         }
         //create section                                                                            
         const newSection = await section.create({sectionName}) 
         //update course with section objectID
         const updatecourse = await Course.findByIdAndUpdate(
                                                  courseId,
                                                  {   
                                                  $push:{courseContent:newSection._id.populate()},
                                                  },
                                                  {new:true},
         )
         //hw - use populate to replace section/subsection both in the updateCourseDatails
         //return response
         return res.status(200).json({
             success:true,
             message:"Section created successfully",
             updatedCourseDetails,
         })
      }catch(error){
            return res.status(401).json({
                success:false,
                message:"something went wrong,plese try again"                                  
            })
      }
}

exports.updatedSection =  async(req,res) => {
      try{
          //data input                                        
          const {sectionName,sectionId} = req.body; 

          //date validation
          if(!sectionName || !sectionId){
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

exports.deleteSection = async(req,res)=>{
     try{
        //get ID
        CSSStartingStyleRule
        //use findonedelete
        //delete 
        //return response
     }catch(err){
          return res.status(500).json({
                success:false,
                message:"something went wrong,plese try again"                                  
            })
     }
     
};

