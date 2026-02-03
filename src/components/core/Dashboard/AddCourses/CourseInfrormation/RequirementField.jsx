import React, { useEffect, useState } from 'react';

const RequirementField = ({ name, label, register, errors, setValue, getValue }) => {
  const [requirements, setRequirements] = useState([""]);

  // Register field once on mount
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value && value.length > 0 && value.some(req => req.trim() !== ""),
    });
  }, [name, register]);

  // Sync state to form values
  useEffect(() => {
    setValue(name, requirements.filter(req => req.trim() !== ""));
  }, [requirements, name, setValue]);

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index] = value;
    setRequirements(updatedRequirements);
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const handleRemoveRequirement = (index) => {
    if (requirements.length > 1) {
      const updatedRequirements = requirements.filter((_, i) => i !== index);
      setRequirements(updatedRequirements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {requirements.map((requirement, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Enter requirement ${index + 1}`}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 pr-12"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                  title="Remove requirement"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddRequirement}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-black rounded-lg transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
        </svg>
        Add Requirement
      </button>

      {errors[name] && (
        <div className="text-red-500 text-sm mt-2 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          At least one requirement is required
        </div>
      )}
    </div>
  );
};

export default RequirementField;
