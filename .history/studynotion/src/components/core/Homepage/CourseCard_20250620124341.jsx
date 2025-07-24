import React from "react";
import { FaUser, FaBook } from "react-icons/fa"; 
import { HomePageExplore } from "../data/homepage-explore";

const CourseCard = () => {
  return (
   HomePageExplore.map((element,index)=>{
        return(
           <Card>
                                                  
           </Card>                                     
        ) 
   })
  );
};

export default CourseCard;
