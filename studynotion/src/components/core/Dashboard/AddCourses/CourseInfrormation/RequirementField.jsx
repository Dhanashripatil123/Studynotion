import React, { useEffect, useState } from 'react';

const RequirementField = ({ name, label, register, errors, setValue, getValue }) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  // Register field once on mount (validate as non-empty array)
  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => Array.isArray(value) ? value.length > 0 : false,
    });
    // initialize from existing form value if present
    const existing = getValue(name);
    if (Array.isArray(existing) && existing.length > 0) {
      setRequirementList(existing);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, register]);

  // Sync state to form values
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, name, setValue]);

  const handleAddRequirement = () => {
    const text = requirement.trim();
    if (!text) return;
    // avoid duplicates
    if (requirementList.includes(text)) {
      setRequirement("");
      return;
    }
    setRequirementList((prev) => [...prev, text]);
    setRequirement("");
  };

  const handleRemoveRequirement = (index) => {
    setRequirementList((prev) => prev.filter((_, i) => i !== index));
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-lg font-medium text-white mb-2">
        {label}
        <sup className="text-red-500">*</sup>
      </label>

      <div className="flex gap-3">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Add a requirement and press Enter or click Add"
          className="flex-1 px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="px-4 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <div className="mt-3 flex flex-wrap">
          {requirementList.map((req, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full mr-2 mb-2"
            >
              <span className="text-sm">{req}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                aria-label={`Remove requirement ${req}`}
                className="text-black/60 hover:text-black"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {errors[name] && <p className="text-red-500 text-sm mt-2">{label} is required</p>}
    </div>
  );
};

export default RequirementField;
