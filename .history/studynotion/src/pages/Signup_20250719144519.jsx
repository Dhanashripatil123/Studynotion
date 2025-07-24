import { useState } from "react";

const tabsName = [
     "Signup",
     "login"
]   

const Signup = ()=>{
        const [currentTab,setCurrentTab] = useState(tabsName[0]);   
        setCurrentTab(value);

       return(
              <div className="w-50%">
              <div className=" w-50% text-justify ml-15 mt-5 ">
                     <p className="text-white text-3xl w-50% ">
                        Join the millions learning to 
                         <p> code with StudyNotion for free</p>
                     </p>
                     <p className="text-[#383a3c]">
                       Build skills for today, tomorrow, and beyond.
                     </p>
                     <p className="text-[#3EBEFF]  font-poppins">
                        Education to future-proof your career.
                     </p>
                     </div>

                      <div className="flex flex-row rounded-full  bg-[#3f4757] mb-5 border-[#AFB2BF] px-1 py-1 ">
                  {   
                  tabsName.map((element,index) => {
                       return(
                             <div
                                   key={index}
                                   className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-[#000814] text-white font-medium" : "text-[#999DAA]"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                                   
                             >
                                   {element}
                      </div>
                  )})
                
               }
               </div>  
               </div> 
                             
  )}     

export default Signup