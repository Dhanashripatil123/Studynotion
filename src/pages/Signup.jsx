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
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] flex items-center justify-center px-4 py-12">
         <div className="max-w-6xl w-full bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
               {/* Left Section - Form */}
               <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="max-w-md mx-auto w-full">
                     <div className="text-center mb-8">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                           Join the millions learning to code with StudyNotion for free
                        </h1>
                        <p className="text-gray-400 text-lg mb-2">
                           Build skills for today, tomorrow, and beyond.
                        </p>
                        <p className="text-blue-400 font-medium">
                           Education to future-proof your career.
                        </p>
                     </div>

                     {/* Account Type Radio Buttons */}
                     <div className="flex gap-4 mb-6">
                        <label className={`px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2 transition-all duration-200 ${accountType === 'Student' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                           <input
                              type="radio"
                              name="accountType"
                              value="Student"
                              checked={accountType === "Student"}
                              onChange={handleOnChange}
                              className="hidden"
                           />
                           <span className="font-medium">Student</span>
                        </label>
                        <label className={`px-6 py-3 rounded-xl cursor-pointer flex items-center gap-2 transition-all duration-200 ${accountType === 'Instructor' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                           <input
                              type="radio"
                              name="accountType"
                              value="Instructor"
                              checked={accountType === "Instructor"}
                              onChange={handleOnChange}
                              className="hidden"
                           />
                           <span className="font-medium">Instructor</span>
                        </label>
                     </div>

                     <form onSubmit={handleSignup} className="space-y-4">
                        {/* Name Fields */}
                        <div className="flex gap-4">
                           <div className="flex-1">
                              <label className="block text-white font-medium mb-2">
                                 First Name
                              </label>
                              <input
                                 type="text"
                                 name="firstName"
                                 value={firstName}
                                 onChange={handleOnChange}
                                 placeholder="Enter your first name"
                                 className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                                 required
                              />
                           </div>

                           <div className="flex-1">
                              <label className="block text-white font-medium mb-2">
                                 Last Name
                              </label>
                              <input
                                 type="text"
                                 name="lastName"
                                 value={lastName}
                                 onChange={handleOnChange}
                                 placeholder="Enter your last name"
                                 className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                                 required
                              />
                           </div>
                        </div>

                        {/* Email */}
                        <div>
                           <label className="block text-white font-medium mb-2">
                              Email Address
                           </label>
                           <input
                              type="email"
                              name="email"
                              value={email}
                              onChange={handleOnChange}
                              placeholder="Enter your email"
                              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                              required
                           />
                        </div>

                        {/* Password Fields */}
                        <div className="flex gap-4">
                           <div className="flex-1 relative">
                              <label className="block text-white font-medium mb-2">
                                 Create Password
                              </label>
                              <input
                                 type={showPassword ? "text" : "password"}
                                 name="password"
                                 value={password}
                                 onChange={handleOnChange}
                                 placeholder="Enter password"
                                 className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 pr-12"
                                 required
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowPassword((prev) => !prev)}
                                 className="absolute right-3 top-10 text-gray-400 hover:text-gray-300 transition-colors"
                              >
                                 {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                              </button>
                           </div>

                           <div className="flex-1 relative">
                              <label className="block text-white font-medium mb-2">
                                 Confirm Password
                              </label>
                              <input
                                 type={showConfirm ? "text" : "password"}
                                 name="confirmPassword"
                                 value={confirmPassword}
                                 onChange={handleOnChange}
                                 placeholder="Confirm password"
                                 className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 pr-12"
                                 required
                              />
                              <button
                                 type="button"
                                 onClick={() => setShowConfirm((prev) => !prev)}
                                 className="absolute right-3 top-10 text-gray-400 hover:text-gray-300 transition-colors"
                              >
                                 {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                              </button>
                           </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                           <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                              <p className="text-red-400 text-sm font-medium">{error}</p>
                           </div>
                        )}

                        {/* Submit Button */}
                        <button
                           type="submit"
                           className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                        >
                           Create Account
                        </button>
                     </form>
                  </div>
               </div>

               {/* Right Section - Image */}
               <div className="lg:w-1/2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center p-8 lg:p-12">
                  <div className="relative">
                     <img
                        src={group_study}
                        alt="Group Study illustration"
                        className="w-full max-w-md h-auto object-contain rounded-2xl shadow-2xl"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Signup;
