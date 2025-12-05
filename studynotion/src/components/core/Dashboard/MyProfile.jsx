import React from "react";
import IconButton from "../../common/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";

const MyProfile = () => {
     const {user} = useSelector((state)=>state.profile)
     const navigate = useNavigate();                                             
     return( 
      <div className="min-h-screen bg-gray-900 text-white p-8">
         {/* Header */}
         <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your account details and personal information</p>
         </div>

         {/* Profile Card */}
         <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-6">
                  <img 
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                    className="aspect-square w-24 h-24 rounded-full object-cover border-4 border-yellow-500"
                  />  
                  <div>
                    <p className="text-3xl font-bold">{user?.firstName + " "+ user?.lastName}</p>
                    <p className="text-gray-400 text-lg">{user?.email}</p>
                    </div>
               </div>
               <button onClick={()=>navigate("/dashboard/settings")} className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition">
                  <FiEdit2 size={20} />
                  Edit Profile
               </button>
            </div>
         </div>

         {/* About Section */}
         <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <h2 className="text-2xl font-bold">About</h2>
                  <p className="text-gray-400 text-sm">Additional Details</p>
               </div>
               <button onClick={()=>navigate("/dashboard/settings")} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
                  <FiEdit2 size={18} />
                  Edit
               </button>
            </div>
            <div className="bg-gray-700 rounded p-4 mt-4">
               <p className="text-gray-300">{ user?.additionalDetails?.about ?? "Write something about yourself" }</p>
            </div>
         </div>

         {/* Personal Details Section */}
         <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-bold">Personal Details</h2>
               <button onClick={() => navigate("/dashboard/settings")} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
                  <FiEdit2 size={18} />
                  Edit
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* First Name */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">First Name</p>
                  <p className="text-xl font-semibold">{user?.firstName || "N/A"}</p>
               </div>

               {/* Last Name */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Last Name</p>
                  <p className="text-xl font-semibold">{user?.lastName || "N/A"}</p>
               </div>

               {/* Email */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Email</p>
                  <p className="text-xl font-semibold">{user?.email || "N/A"}</p>
               </div>

               {/* Gender */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Gender</p>
                  <p className="text-xl font-semibold">{user?.additionalDetails?.gender || "N/A"}</p>
               </div>

               {/* Contact Number */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Contact Number</p>
                  <p className="text-xl font-semibold">{user?.additionalDetails?.contactNumber || "N/A"}</p>
               </div>

               {/* Date of Birth */}
               <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-400 text-sm font-semibold mb-2">Date of Birth</p>
                  <p className="text-xl font-semibold">{user?.additionalDetails?.dateOfBirth || "N/A"}</p>
               </div>
            </div>
         </div>
      </div>
        )
}

export default MyProfile