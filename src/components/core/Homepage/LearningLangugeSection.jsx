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

                   <div className="flex items-end justify-center mt-5">
                      <img src={know_your_progress} alt="Know your progress" className="object-cover w-32 h-32 md:w-44 md:h-44 rounded-lg shadow-2xl transform -rotate-6 z-30"/>
                       <img src={compare_with_others} alt="Compare with others" className="object-cover w-32 h-32 md:w-44 md:h-44 rounded-lg shadow-2xl transform rotate-0 -ml-8 md:-ml-10 z-20"/>
                       <img src={plan_your_lesson} alt="Plan your lesson" className="object-cover w-32 h-32 md:w-44 md:h-44 rounded-lg shadow-2xl transform rotate-6 -ml-8 md:-ml-12 z-10"/>
                    </div>

                    <div className="w-fit pb-6">
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