import React from 'react';
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/know_your_progress.webp"
import compare_with_others from "../../../assets/Images/compare_with_others.webp"
import plan_your_lesson from "../../../assets/Images/plan_your_lesson.webp"
import CTAButton from "./Button"


const LearningLangugeSection = () => {
      return(
         <div className='mt-130'>
             <div className="mt-[130px] mb-32">
               <div className="flex flex-col gap-5 ">   

                   <div className="text-4xl font-semibold text-center">
                       Your Swiss Knite for 
                       <HighlightText text={"learning any language"}/>                         
                   </div>

                   <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
                      Using spin making learning multiple language easy. with 20+ language realistic voice-over , progress tracking custom schedule and more
                   </div>

                   <div className="flex flex-row items-center justify-center mt-5">
                      <img src={know_your_progress} class="w-75 h-80" alt="KnowYourProgressImage" className="object-contain "/>
                       {/* <img src={compare_with_others} alt="KnowYourProgressImage" className="object-contain "/> */}
                       <img src={plan_your_lesson}  alt="KnowYourProgressImage" className="object-contain ml-32"/>
                    </div>

                    <div className="w-fit">
                        <CTAButton active={true} link={"/signup"}>
                           <div>
                             Learn more
                           </div>
                        </CTAButton>
                    </div>
                   </div>
           </div>                                                 
         </div>                                          
      )                                            
}

export default LearningLangugeSection