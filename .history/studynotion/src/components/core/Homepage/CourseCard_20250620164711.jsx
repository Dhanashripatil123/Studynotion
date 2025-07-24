import React from "react";
import { FaUser, FaBook } from "react-icons/fa"; 
import { HomePageExplore } from "../../../data/homepage-explore";


const Course = () => {
  return (
    <div className="p-4 space-y-8">
      {HomePageExplore.map((category) => (
        <div key={category.tag}>
          <h2 className="text-2xl font-bold">{category.tag}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {category.courses.length > 0 ? (
              category.courses.map((course) => (
                <div
                  key={course.heading}
                  className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{course.heading}</h3>
                  <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  <div className="mt-3 flex justify-between text-gray-500 text-sm">
                    <span>Level: {course.level}</span>
                    <span>Lessons: {course.lessonNumber}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No courses available</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};




export default CourseCard;
