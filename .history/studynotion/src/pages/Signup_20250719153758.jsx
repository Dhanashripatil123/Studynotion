import { useState } from "react";

const tabsName = [
     "Signup",
     "login"
]   

const Signup = ()=>{
        const [currentTab,setCurrentTab] = useState(tabsName[0]); 
       

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

                      {/* <div className="flex flex-row rounded-full  bg-[#3f4757] mb-5 border-[#AFB2BF] px-1 py-1 ">
                  {   
                  tabsName.map((element,index) => {
                       return(
                             <div
                    key={index}
                                  
                                  
                                   
                             >
                                   {element}
                      </div>
                  )})
                
               }
               </div>   */}

               <div>
                  <p className="flex flex-row">
                     <p>first Name</p> 
                     <p className="rounded-full w-1xl bg-[#ffffff3f]">first Name</p>  
                  </p>
                  <p className="flex flex-row">
                     <p>last Name</p> 
                     <p className="rounded-full w-1xl">last Name</p>  
                  </p>
               </div>
               </div> 
                             
  )}     

export default Signup