import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import group_study from "../assets/Images/group_study.webp";
import { sendOtp } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../slices/authSlice";

const tabsName = ["Signup", "Login"];

const Signup = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirm, setShowConfirm] = useState(false);
   const [error, setError] = useState("");
   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "Student",
   });

   const { firstName, lastName, email, password, confirmPassword, accountType } = formData;

   const handleOnChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
         ...prevData,
         [name]: value,
      }));
   };

   const handleSignup = (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         setError("Passwords do not match");
         return;
      }

      setError("");
      const signupPayload = {
         accountType:accountType,
         firstName,
         lastName,
         email,
         password,
         confirmPassword,
      };
      console.log(signupPayload);
      
      dispatch(setSignupData(signupPayload));
      dispatch(sendOtp(email));
      navigate("/verify-email");
   };

   return (
      <div className="flex flex-row gap-10 items-start mt-10">
         {/* Left Section */}
         <div className="w-1/2 ml-10">
            <p className="text-white text-2xl font-semibold">
               Join the millions learning to <br /> code with StudyNotion for free
            </p>
            <p className="text-[#383a3c] mt-2">
               Build skills for today, tomorrow, and beyond.
            </p>
            <p className="text-[#3EBEFF] font-poppins mt-1">
               Education to future-proof your career.
            </p>

         
            

            {/* Form */}
            <form onSubmit={handleSignup} className="mt-6 space-y-4">
               {/* Account Type Radio Buttons */}
               <div className="flex gap-6 text-white">
                  <label className="flex items-center gap-2">
                     <input
                        type="radio"
                        name="accountType"
                        value="Student"
                        checked={accountType === "Student"}
                        onChange={handleOnChange}
                     />
                     Student
                  </label>
                  <label className="flex items-center gap-2">
                     <input
                        type="radio"
                        name="accountType"
                        value="Instructor"
                        checked={accountType === "Instructor"}
                        onChange={handleOnChange}
                     />
                     Instructor
                  </label>
               </div>

               {/* Name Fields */}
               <div className="flex gap-4">
                  <label className="flex flex-col w-1/2">
                     <span className="text-white">First Name</span>
                     <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder="Enter your first name"
                        className="px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl"
                        required
                     />
                  </label>

                  <label className="flex flex-col w-1/2">
                     <span className="text-white">Last Name</span>
                     <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder="Enter your last name"
                        className="px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl"
                        required
                     />
                  </label>
               </div>

               {/* Email */}
               <label className="flex flex-col">
                  <span className="text-white">Email Address</span>
                  <input
                     type="email"
                     name="email"
                     value={email}
                     onChange={handleOnChange}
                     placeholder="Enter your email"
                     className="px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl"
                     required
                  />
               </label>

               {/* Password Fields */}
               <div className="flex gap-4 relative">
                  <label className="flex flex-col w-1/2 relative">
                     <span className="text-white">Create Password</span>
                     <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter password"
                        className="px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl"
                        required
                     />
                     <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                     >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                     </span>
                  </label>

                  <label className="flex flex-col w-1/2 relative">
                     <span className="text-white">Confirm Password</span>
                     <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm password"
                        className="px-4 py-2 bg-gray-700 text-white placeholder:text-gray-400 rounded-2xl"
                        required
                     />
                     <span
                        onClick={() => setShowConfirm((prev) => !prev)}
                        className="absolute right-3 top-9 text-gray-400 cursor-pointer"
                     >
                        {showConfirm ? <FaEyeSlash /> : <FaEye />}
                     </span>
                  </label>
               </div>

               {/* Error Message */}
               {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

               {/* Submit Button */}
               <button
                  type="submit"
                  className="bg-yellow-500 text-black rounded-2xl px-4 py-2 font-semibold w-full"
               >
                  Signup
               </button>
            </form>
         </div>

         {/* Right Section */}
         <div className="w-1/2 flex justify-center items-center">
            <img
               src={group_study}
               alt="Group Study"
               className="h-[350px] w-[350px] object-contain"
            />
         </div>
      </div>
   );
};

export default Signup;
