import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCoursesByCategory, fetchCourseCategories } from '../services/operations/courseDetailsAPI';
import FooterLinks2 from "../components/FooterLink2"
import Course_Card from  "../components/core/catalog/Course_Card"
import CourseSlider from '../components/core/catalog/CourseSlider'

const Card = ({ course, onClick }) => {
      
  
  return (
    <div onClick={onClick} className="cursor-pointer bg-white text-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.courseName} className="h-full w-full object-cover" />
        ) : (
          <div className="text-gray-500">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{course.courseName}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">{course.description}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-700">{course.instructorName || 'Unknown'}</div>
          <div className="text-sm font-bold">₹{course.price}</div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>{course.categoryName || ''}</span>
          <span>⭐ {course.rating || 0}</span>
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Catalog</h1>
       <div className='text-white'>Course to get you started</div>
              <div className="flex gap-x-3">
                  <p>Most Popular</p>
                  <p>New</p>   
                     <CourseSlider Courses={courses}></CourseSlider>                                                                    
              </div> 
              <div>
                            <p>Top Courses in this category: {catalogPageData?.data?.selectCategory?.courses?.length || 0} </p> 
                             <div>
                              <CourseSlider Courses={courses}></CourseSlider>                             
                            </div>                                 
                         </div>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses && courses.length > 0 ? (
            courses.map((c) => (
              <Card key={c.courseId} course={c} onClick={() => navigate(`/course/${c.courseId}`)} />
            ))
          ) : (
            <div className="text-gray-500">No courses found for this category.</div>
          )}
        </div>
      )}
       <FooterLinks2></FooterLinks2>
    </div>
    
  );
};

export default CatalogByCategory;
