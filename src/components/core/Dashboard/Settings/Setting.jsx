import React, { useState, useEffect } from "react";
import { FileUpload } from "./fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
//import { updateProfile } from "../../../../services/operations/profile";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    dob: user?.additionalDetails?.dateOfBirth || "",
    gender: user?.additionalDetails?.gender || "",
    contact: user?.additionalDetails?.contactNumber || "",
    about: user?.additionalDetails?.about || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        dob: user?.additionalDetails?.dateOfBirth || "",
        gender: user?.additionalDetails?.gender || "",
        contact: user?.additionalDetails?.contactNumber || "",
        about: user?.additionalDetails?.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("First Name and Last Name are required");
      return;
    }

    if (formData.contact && !/^\d{10}$/.test(formData.contact)) {
      toast.error("Contact number must be 10 digits");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        contactNumber: formData.contact,
        about: formData.about,
      };
      
      if (updateProfile) {
        await updateProfile(updatedData, token);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      toast.success("Password updated successfully");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">
          Manage your account settings and security preferences
        </p>
      </div>

      {/* Avatar Upload Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Profile Picture</h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/50">
              <FileUpload />
            </div>
            <div className="text-center md:text-left">
              <span className="text-xl md:text-2xl font-bold text-white">
                {`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Your Name'}
              </span>
              <p className="text-gray-400 mt-1">{user?.email || ''}</p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                  {user?.accountType || "Student"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Form Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 to-teal-900/10 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Personal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-white font-semibold mb-3">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-white font-semibold mb-3">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white font-semibold mb-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-white font-semibold mb-3">Contact Number</label>
              <input
                type="tel"
                name="contact"
                placeholder="10-digit mobile number"
                value={formData.contact}
                onChange={handleChange}
                maxLength="10"
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
              />
            </div>

            {/* About */}
            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-3">About</label>
              <textarea
                name="about"
                placeholder="Tell us about yourself"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-gray-600 hover:border-gray-500"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-600 disabled:to-gray-700 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 disabled:transform-none disabled:shadow-none"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-pink-900/10 rounded-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Change Password</h2>

          <div className="space-y-6">
            {/* Old Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your current password"
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 8 characters)"
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showNewPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 pr-12 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-gray-600 hover:border-gray-500"
              onClick={() => setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" })}
            >
              Cancel
            </button>
            <button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 disabled:transform-none disabled:shadow-none"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;