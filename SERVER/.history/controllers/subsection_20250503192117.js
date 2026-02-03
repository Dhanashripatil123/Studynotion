const Subsection = require('../models/SubSection');
const Section = require('../models/section')

//create Subsection

exports.creteSubSection = async(req,res)=>{
     try{
        //fetch data from req body
        const {sectinId,title,timeDuration,description} = req.body

        //extract file/video
        const video = req.file

     }catch(error){
         
     }
}