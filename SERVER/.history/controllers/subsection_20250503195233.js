const Subsection = require('../models/SubSection');
const Section = require('../models/section')

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
        const updatesection = await Section.findByIdAndUpdate({
          
        })
     }catch(error){
         
     }
}