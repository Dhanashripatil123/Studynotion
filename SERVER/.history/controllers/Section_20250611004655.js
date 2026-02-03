const section = require("../models/section");
const Course = require ("../models/Course");


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
         const newSection = await section.create({sectionName,course:courseId}); 

         //update course with section objectID
          const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                  courseId,
                                                  {   
                                                  $push:{courseContent:newSection._id},
                                                  },
                                                  {new:true},
         ).populate()
         //hw - use populate to replace section/subsection both in the updateCourseDatails
         //return response
         return res.status(200).json({
             success:true,
             message:"Section created successfully",
             updatedCourseDetails,
         })
      }catch(error){
        console.log(error);
        
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
          const section = await section.findByIdAndUpdate(sectionId, { sectionName },{new:true});

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
        //get ID - assuming that we are sending ID in params
        const {sectionId } = req.body;

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
