import React from 'react';
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/know_your_progress.webp"
import compare_with_others from "../../../assets/Images/compare_with_others.webp"
import plan_your_lesson from "../../../assets/Images/plan_your_lesson.webp"
import CTAButton from "./Button"


const LearningLangugeSection = () => {
      return(
         <div className='mt-[130px] '>
           
               <div className="flex flex-col gap-5 items-center">   

                   <div className="text-4xl font-semibold text-center">
                       Your Swiss Knite for 
                       <HighlightText text={"learning any language"}/>                         
                   </div>

                   <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[70%]">
                      Using spin making learning multiple language easy. with 20+ language realistic voice-over , progress tracking custom schedule and more
                   </div>

                   <div className="flex flex-row items-center gap-5 justify-center mt-5">
                      <img src={know_your_progress} class="w-70 h-80" alt="KnowYourProgressImage" className="object-contain "/>
                       <img src={compare_with_others} class="w-70 h-80" alt="KnowYourProgressImage" className="object-contain "/>
                       <img src={plan_your_lesson} class="w-70 h-80"  alt="KnowYourProgressImage" className="object-contain "/>
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
                                                
      )                                            
}

export default LearningLangugeSection