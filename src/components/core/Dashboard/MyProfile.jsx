import React from "react";
import IconButton from "../../common/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import Avatar from "../../common/Avatar";

const MyProfile = () => {
     const {user} = useSelector((state)=>state.auth)
     const navigate = useNavigate();
     return(
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-4 md:p-8">
         {/* Header */}
         <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
               My Profile
            </h1>
            <p className="text-gray-400 text-lg md:text-xl">
               Manage your account details and personal information
            </p>
         </div>

         {/* Profile Card */}
         <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-3xl"></div>
            <div className="relative z-10">
               <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                     <div className="relative">
                        <Avatar size="3xl" className="border-4 border-yellow-500 shadow-2xl" />
                        <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
                     </div>
                     <div className="text-center md:text-left">
                        <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                           {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-gray-400 text-lg md:text-xl mt-1">{user?.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                           <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                              {user?.accountType || "Student"}
                           </span>
                        </div>
                     </div>
                  </div>
                  <button
                     onClick={()=>navigate("/dashboard/settings")}
                     className="flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                  >
                     <FiEdit2 size={20} />
                     Edit Profile
                  </button>
               </div>
            </div>
         </div>

         {/* About Section */}
         <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-teal-900/10 rounded-3xl"></div>
            <div className="relative z-10">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <div>
                     <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">About</h2>
                     <p className="text-gray-400 text-sm md:text-base">Tell us more about yourself</p>
                  </div>
                  <button
                     onClick={()=>navigate("/dashboard/settings")}
                     className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500"
                  >
                     <FiEdit2 size={18} />
                     Edit
                  </button>
               </div>
               <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                     { user?.additionalDetails?.about ?? "Write something about yourself to help others know you better!" }
                  </p>
               </div>
            </div>
         </div>

         {/* Personal Details Section */}
         <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-3xl"></div>
            <div className="relative z-10">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                  <div>
                     <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Personal Details</h2>
                     <p className="text-gray-400 text-sm md:text-base">Your personal information and contact details</p>
                  </div>
                  <button
                     onClick={() => navigate("/dashboard/settings")}
                     className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-xl transition-all duration-200 border border-gray-600 hover:border-gray-500"
                  >
                     <FiEdit2 size={18} />
                     Edit
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">First Name</p>
                     <p className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {user?.firstName || "Not provided"}
                     </p>
                  </div>

                  {/* Last Name */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Last Name</p>
                     <p className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {user?.lastName || "Not provided"}
                     </p>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Email Address</p>
                     <p className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors break-all">
                        {user?.email || "Not provided"}
                     </p>
                  </div>

                  {/* Gender */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Gender</p>
                     <p className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                        {user?.additionalDetails?.gender || "Not specified"}
                     </p>
                  </div>

                  {/* Contact Number */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Contact Number</p>
                     <p className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {user?.additionalDetails?.contactNumber || "Not provided"}
                     </p>
                  </div>

                  {/* Date of Birth */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200 group">
                     <p className="text-gray-400 text-sm font-semibold mb-3 uppercase tracking-wide">Date of Birth</p>
                     <p className="text-xl md:text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">
                        {user?.additionalDetails?.dateOfBirth || "Not provided"}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
        )
}

export default MyProfile