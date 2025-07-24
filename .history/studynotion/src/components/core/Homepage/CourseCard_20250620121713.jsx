// src/components/Card.jsx
import React from "react";

const Card = ({ title, description,image}) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {image && (
        <img className="w-full h-48 object-cover" src={image} alt={title} />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <button className="mt-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Card;
