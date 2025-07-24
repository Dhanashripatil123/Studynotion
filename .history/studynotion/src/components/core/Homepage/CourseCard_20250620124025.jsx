import React from "react";
import { FaUser, FaBook } from "react-icons/fa"; 
import { HomePageExplore } from 

const CourseCard = ({ title, description, level, lessons }) => {
  return (
    <div className="bg-white rounded-xl border-b-4 border-yellow-500 shadow-lg p-4 max-w-sm hover:shadow-2xl transition">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm mt-2">{description}</p>

      <div className="flex justify-around items-center mt-4 text-gray-600">
        <div className="flex items-center space-x-1">
          <FaUser />
          <span>{level}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaBook />
          <span>{lessons}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
