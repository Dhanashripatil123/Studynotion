import React from 'react';

const LearningLangugeSection = () => {
      return(
         <div>
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
                      <img src={know_your_progress} alt="KnowYourProgressImage" className="object-contain -mr-32"/>
                       <img src={compare_with_others} alt="KnowYourProgressImage" className="object-contain"/>
                       <img src={plan_your_lesson} alt="KnowYourProgressImage" className="object-contain -ml-32"/>
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

