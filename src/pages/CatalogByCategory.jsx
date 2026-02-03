import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoursesByCategory, fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import FooterLinks2 from "../components/FooterLink2"
import Course_Card from  "../components/core/catalog/Course_Card"
import CourseSlider from '../components/core/catalog/CourseSlider'

const Card = ({ course, onClick }) => {
      
  
  return (
    <div onClick={onClick} className="cursor-pointer bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-yellow-400/50 group">
      {/* Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-6xl text-gray-600">📚</div>
        )}

        {/* Overlay with price */}
        <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
          ₹{course.price || 'Free'}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
            View Course
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {course.courseName}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500">
            By {course.instructorName || 'Expert Instructor'}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-white">{course.rating || '4.5'}</span>
          </div>
        </div>

        {/* Category badge */}
        <div className="flex items-center justify-between">
          <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium">
            {course.categoryName || 'General'}
          </span>
          <span className="text-xs text-gray-500">
            {course.duration || '8 weeks'}
          </span>
        </div>
      </div>
    </div>
  );
};

const CatalogByCategory = () => {
   const [catalogPageData,setCatalogPageData] = useState(null);
   
  const { categoryId, catalogName } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isObjectIdLike = (val) => {
      return typeof val === 'string' && /^[0-9a-fA-F]{24}$/.test(val);
    };

    const load = async () => {
      // Prefer a true ObjectId value for API calls. If the route param `categoryId`
      // contains a slug (like "web-dev"), resolve it to the DB _id and update
      // the URL so the app uses a canonical `/catalog/:id` path.
      let resolvedId = null;

      try {
        if (categoryId) {
          if (isObjectIdLike(categoryId)) {
            resolvedId = categoryId;
          } else {
            // categoryId is present but looks like a slug; resolve it
            const list = await fetchCourseCategories();
            const canonical = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const normalized = canonical(categoryId);
            const matched = list.find(ct => (canonical(ct?.name) === normalized || canonical(ct?.slug) === normalized));
            if (matched && matched._id) {
              resolvedId = matched._id;
              // replace the URL to the canonical id-based path
              navigate(`/catalog/${matched._id}`, { replace: true });
            }
          }
        }

        // If no categoryId param, but catalogName (older route) is provided, resolve it
        if (!resolvedId && catalogName) {
          const list = await fetchCourseCategories();
          const canonical = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const normalized = canonical(catalogName);
          const matched = list.find(ct => (canonical(ct?.name) === normalized || canonical(ct?.slug) === normalized));
          if (matched && matched._id) {
            resolvedId = matched._id;
            navigate(`/catalog/${matched._id}`, { replace: true });
          }
        }

      } catch (err) {
        console.error('Failed to resolve category slug to id', err);
      }

      if (!resolvedId) {
        setCourses([]);
        return;
      }

      setLoading(true);
      // request a large pageSize so UI shows all courses for this category
      const res = await getCoursesByCategory(resolvedId, { pageSize: 1000 });
      setCourses(res || []);
      setLoading(false);
    };
    load();
  }, [categoryId, catalogName, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Course Catalog
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover amazing courses to boost your skills and advance your career
            </p>

            {/* Category Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-yellow-400">{courses?.length || 0}</div>
                <div className="text-sm text-gray-300">Courses Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-gray-300">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-2xl font-bold text-green-400">10K+</div>
                <div className="text-sm text-gray-300">Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Courses</h2>
              <p className="text-gray-400">Choose from our curated collection of premium courses</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-colors duration-200">
                Most Popular
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 transition-colors duration-200">
                New
              </button>
              <button className="px-6 py-2 bg-gray-700 text-white font-medium rounded-full hover:bg-gray-600 transition-colors duration-200">
                Free
              </button>
            </div>
          </div>

          {/* Course Count */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-lg">
              <span className="font-semibold text-yellow-400">{courses?.length || 0}</span> courses found in this category
            </p>
          </div>
        </div>

        {/* Course Slider */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Featured Courses</h3>
          <CourseSlider Courses={courses} />
        </div>

        {/* Course Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">All Courses</h3>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              <span className="ml-3 text-gray-400">Loading courses...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses && courses.length > 0 ? (
                courses.map((c) => (
                  <Card key={c.courseId} course={c} onClick={() => navigate(`/course/${c.courseId}`)} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
                  <p className="text-gray-500">This category doesn't have any courses yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <FooterLinks2 />
    </div>
  );
};

export default CatalogByCategory;
