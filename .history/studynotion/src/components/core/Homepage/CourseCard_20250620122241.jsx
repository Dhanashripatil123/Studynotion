// src/components/Card.jsx
import React from "react";

const CourseCard = () => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-y hover:shadow-2xl transition transform hover:-translate-y-1 bg-white">
      {/* {image && (
        <img className="w-full h-48 object-cover" src={image} alt={title} />
      )} */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">your</h2>
        <p className="mt-2 text-gray-600">my name</p>
        
      </div>
    </div>
  );
};

export default CourseCard;
