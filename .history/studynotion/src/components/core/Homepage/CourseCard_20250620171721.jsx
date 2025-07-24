import React from 'react';
import { HomePageExplore } from './yourDataFile';

const Course = () => {
  // Get only first three sections (Free, New to coding, Most popular)
  const topThreeSections = HomePageExplore.slice(0, 3);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {topThreeSections.map((section) => (
        <div
          key={section.tag}
          className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold text-gray-800">{section.tag}</h2>

          {section.courses.length > 0 ? (
            <div className="mt-3 space-y-3">
              {section.courses.map((course) => (
                <div key={course.heading} className="border rounded-xl p-3 hover:bg-gray-50">
                  <h3 className="text-lg font-semibold">{course.heading}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <div className="mt-2 flex justify-between text-gray-500 text-sm">
                    <span>Level: {course.level}</span>
                    <span>Lessons: {course.lessonNumber}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 mt-3">No courses available</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomePageExploreCards;
