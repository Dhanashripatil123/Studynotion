import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import girl from "../assets/Images/girl.webp"
import { useDispatch} from "react-redux";
import {useNavigate,Link} from "react-router-dom";

import { login } from "../services/operations/authAPI";



 

const Login = ()=>{


    const navigate = useNavigate()
    const dispatch = useDispatch()

   const [showConfirm, setShowConfirm] = useState(false);
   const [formData,setFormData] = useState({
      email:"",
      password:"",
   });

   const {email,password} = formData

   const handleOnChange = (e) => {
      setFormData((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

     
     const handleOnSubmit = (e) => {

      e.preventDefault()

      if(!email || !password){
         alert("Please fill all requirement")
         return;
      }

      dispatch(login(email, password , navigate ))
        };
  
       return(
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] flex items-center justify-center px-4 py-12">
            <div className="max-w-6xl w-full bg-gray-900/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section - Form */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-400 text-lg mb-2">
                                    Build skills for today, tomorrow, and beyond.
                                </p>
                                <p className="text-blue-400 font-medium">
                                    Education to future-proof your career.
                                </p>
                            </div>

                            <form onSubmit={handleOnSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleOnChange}
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-white font-medium mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={handleOnChange}
                                            placeholder="Enter your password"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                        >
                                            {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <Link
                                        to="/ForgotPassword"
                                        className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section - Image */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center p-8 lg:p-12">
                        <div className="relative">
                            <img
                                src={girl}
                                alt="Welcome illustration"
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

export default Login