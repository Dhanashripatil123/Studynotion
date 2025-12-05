import React, { useEffect, useState } from 'react';

const RequirementField = ({ name, label, register, errors, setValue, getValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  // Register field once on mount
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, [name, register]);

  // Sync state to form values
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, name, setValue]);

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedList = [...requirementList];
    updatedList.splice(index, 1);
    setRequirementList(updatedList);
  };

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>

      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="w-full bg-white text-gray-600" 
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="font-semibold   text-yellow-400"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((req, index) => (
            <li key={index} className="flex items-center text-black">
              <span>{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-bold text-gray-300 ml-2"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}

      {errors[name] && <span>{label} is required</span>}
    </div>
  );
};

export default RequirementField;
