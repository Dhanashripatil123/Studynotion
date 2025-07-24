import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import girl from "../assets/Images/girl.webp"
import { useDispatch} from "react-redux";
import {useNa}
 

const Login = ()=>{
     
    const navigate = useNavigate(),
    const dispatch = useDispatch(),
   
     const [showConfirm, setShowConfirm] = useState(false);
     
     const handleOnSubmit = (e) => {
      e.preventDefault()
      dispatch(login(email, password , navigate ))
     }

       return(
              <form onSubmit={handleOnSubmit} className="w-50% flex flex-row gap-70 items-center mt-46">
              <div className=" w-50% text-justify ml-15 mt-5 gap-9">
               <div>
                     <p className="text-white text-2xl font-semibold w-50%  ">
                        Welcome Back
                     </p>
                </div>
                     <br></br>
                     <p className="text-[#383a3c] ">
                       Build skills for today, tomorrow, and beyond.
                     </p>
                     <p className="text-[#3EBEFF]  font-poppins">
                        Education to future-proof your career.
                     </p>
                   
                   <div className="gap-y-72">
                   <p className="text-white mt-4">Email Adress</p>
                   <input
                   type="text"
                   placeholder="Enter the email address"
                   class="w-full px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                /> 
                
                <div className="flex flex-row gap-8 mt-4">
                    <p className="flex flex-col">
                      <p className="text-white">Password </p>
                      <input
                         type={showConfirm?"text":"password"}
                         placeholder="Enter the  Password"
                         class=" px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 placeholder:font-medium rounded-2xl"
                      />
                      
                      <span
                         onClick={() => setShowConfirm((prev) => !prev)}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                      >
                         {showConfirm ? <FaEyeSlash /> : <FaEye />}
                      </span>
                      <p className="text-[#3EBEFF] mr-70">Forget Password</p>
                  </p>
                  </div>
                  
                <p className="px-4 py-2 mt-5">
                   <button type="submit" className="text-black bg-yellow-500 rounded-2xl text-center px-4 py-2">
                      Login
                   </button>
                </p>
                </div>
             </div>
 

             <div className="items-center justify-center">
               <img
                  src={girl}
                  alt="group study"
                   className="h-86 w-96"
                
               ></img>
             </div>
               </form> 
                             
  )}     

export default Login