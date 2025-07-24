import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const tabsName = [
     "Signup",
     "login"
]   

const Signup = ()=>{
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
       

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

               <div className="flex flex-row gap-8">
                  <p className="flex flex-col">
                     <p className="text-white">first Name</p> 
                      <input
                         type="text"
                         placeholder="Enter the First Name"
                         class="w-1xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                      />
                  </p>
                  <p className="flex flex-col">
                     <p className="text-white">last Name</p> 
                      <input
                         type="text"
                         placeholder="Enter the last Name"
                         class="w-1xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                      /> 
                  </p>
                  
                 
               </div>

                <p className="text-white">Email Adress</p>
                <input
                   type="text"
                   placeholder="Enter the email address"
                   class="w-1.5xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                /> 
                
                <div className="flex flex-row gap-8">
                   <p className="flex flex-col">
                      <p className="text-white">Create Password</p>
                      <input
                         type={showPassword?"Text":"password"}
                         placeholder="password"
                         class="w-1xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                      />
                      <span
                         onClick={() => setShowPassword((prev) => !prev)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      >
                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                   </p>

                   <p className="flex flex-col">
                      <p className="text-white">Confirm Password </p>
                      <input
                         type={showConfirm?"text":"password"}
                         placeholder="Confirm Password"
                         class="w-1xl px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                      />
                      <span
                         onClick={() => setShowConfirm((prev) => !prev)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      >
                         {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </span>
                       
                       <div className="items-center rounded-2xl w-10px">
                      <p className="text-black bg-yellow-500 justify-center">
                         Signup
                      </p>
                      </div>
                    
                   </p>

                  


                </div>

             </div>
               </div> 
                             
  )}     

export default Signup