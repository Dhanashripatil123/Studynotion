import React from "react";
//Edtech fronted class3
export default function MyCoursePage() {
  const courses = [
    {
      title: "Introduction to Design",
      description:
        "This course provides an overview of the design process, design thinking, and basic design principles.",
      duration: "20 hrs",
      price: "₹1500",
      date: "March 27, 2023",
      thumbnail:
        "https://images.unsplash.com/photo-1581091215367-59ab6d62d3a9?w=400&q=80",
    },
    {
      title: "Graphic Design",
      description:
        "Learn graphic design tools, color theory, typography, and layout techniques.",
      duration: "15 hrs",
      price: "₹1200",
      date: "April 10, 2023",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80",
    },
    {
      title: "Web Design",
      description:
        "This module covers the basics of designing and building websites, including HTML, CSS, and responsive design.",
      duration: "12 hrs",
      price: "₹1800",
      date: "April 15, 2023",
      thumbnail:
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 hidden md:block">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <a className="block hover:text-yellow-400">My Courses</a>
          <a className="block hover:text-yellow-400">Settings</a>
          <a className="block hover:text-yellow-400">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">My Course</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Courses</h2>

          <div className="space-y-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-700 rounded-xl p-4 gap-6 shadow-lg hover:shadow-2xl transition"
              >
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  className="w-40 h-28 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-300 text-sm max-w-xl">
                    {course.description}
                  </p>
                  <p className="text-gray-400 text-xs">Created: {course.date}</p>
                </div>

                {/* Course Meta */}
                <div className="text-center">
                  <p className="text-sm">Duration</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>

                <div className="text-center">
                  <p className="text-sm">Price</p>
                  <p className="font-semibold">{course.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 text-yellow-400 text-xl">
                  <button className="hover:text-white transition">✏️</button>
                  <button className="hover:text-red-400 transition">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
