import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.webp"


const InstructorSection = () => {
   return( 
   <div className="mt-16 ">
      <div className="flex flex-row gap-20 item-center ">
         <div className="w-[50%]"> 
            <img
               src={Instructor}
               alt=""
               className= "shadow-white"
            ></img>
         </div> 

         <div className="w-[50%] flex flex-col gap-10">
            <div className=" text-4xl flex flex-col font-semibold w-[50%]">
               Become an 
               <HighlightText text={"Instructor"}></HighlightText>
            </div>
         </div>
         
         <p className="font-medium text-[16px] w-[80%] text-richblack-300 ">
            Instructor from around the world teach millons of student on studynotion.we provise a tools and skill to teach what you love.
         </p>

         <div className="w-fit">
         <CTAButton active={true} linkto={"/signup"}>
           <div className="flex flex-row gap-2">
               start learning today
               <FaArrowRight></FaArrowRight>
           </div>
         </CTAButton>
            </div>
      </div>                                            
   </div>
   )
}

export default InstructorSection 