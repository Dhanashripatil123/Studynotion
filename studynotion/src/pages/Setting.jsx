import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "Love",
    lastName: "Babbar",
    dob: "",
    gender: "Male",
    contact: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
  };

  return (
    <div className="flex flex-col  bg-[#0f0f0f]  text-white p-x-4 p-x-8 ml-[220px] pt-8">
      {/* This lg:ml-[220px] assumes your sidebar is 220px wide */}

      <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-8 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>

        {/* Avatar Upload */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-xl font-bold">
            LB
          </div>
          <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
            Select
          </button>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 flex items-center">
            Upload <span className="ml-2">⬆</span>
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="text"
              name="dob"
              placeholder="dd/mm/yyyy"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Contact Number</label>
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">About</label>
            <input
              type="text"
              name="about"
              placeholder="Enter Bio Details"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2a2a2a] border border-gray-600 rounded"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
