const Sectioon = require("../models/section");
const Course = require ("../models/Course");
const { response } = require("express");

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
         //create secction
         
         //update course with section objectID
         //return response
      }catch(error){

      }
}