import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import group_study from "../assets/Images/group_study.webp"

const tabsName = [
     "Signup",
     "login"
]   

const Login = ()=>{
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
       

       return(
              <div className="w-50% flex flex-row gap-70 items-center mt-26">
              <div className=" w-50% text-justify ml-15 mt-5 gap-9">
               <div>
                     <p className="text-white text-2xl font-semibold w-50%  ">
                        Join the millions learning to 
                         <p> code with StudyNotion for free</p>
                     </p>
                </div>
                     <br></br>
                     <p className="text-[#383a3c] ">
                       Build skills for today, tomorrow, and beyond.
                     </p>
                     <p className="text-[#3EBEFF]  font-poppins">
                        Education to future-proof your career.
                     </p>
                   
                   <br></br>

                      {<div className="flex flex-row rounded-full  bg-[#3f4757] mb-5 border-[#AFB2BF] px-1 py-1 ">
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
               </div>}

                <div className="gap-y-72">
               <div className="flex flex-row gap-x-3">
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

                <p className="text-white mt-4">Email Adress</p>
                <input
                   type="text"
                   placeholder="Enter the email address"
                   class="w-full px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                /> 
                
                <div className="flex flex-row gap-8 mt-4">
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
                  </p>
                  </div>
                  
                <p className="px-4 py-2 mt-4 ml-40">
                   <label className="text-black bg-yellow-500 justify-center rounded-2xl w-1xl px-4 py-2">
                      Signup
                   </label>
                </p>
                </div>
             </div>
 

             <div className="items-center justify-center">
               <img
                  src={group_study}
                  alt="group study"
                   className="h-86 w-86"
                
               ></img>
             </div>
               </div> 
                             
  )}     

export default Login