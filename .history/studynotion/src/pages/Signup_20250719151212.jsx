import { useState } from "react";

const tabsName = [
     "Signup",
     "login"
]   

const Signup = ()=>{
       
      

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

                   <div className="flex gap-4">
                         <span
                               onClick={() => setActive("instructor")}
                               className={`px-4 py-2 rounded-md cursor-pointer ${active === "instructor" ? "bg-black text-white" : "text-white"
                                     } hover:bg-black hover:text-white`}
                         >
                               Instructor
                         </span>
                         <span
                               onClick={() => setActive("student")}
                               className={`px-4 py-2 rounded-md cursor-pointer ${active === "student" ? "bg-black text-white" : "text-white"
                                     } hover:bg-black hover:text-white`}
                         >
                               Student
                         </span>
                   </div>
               </div>  
               
                             
  )}     

export default Signup