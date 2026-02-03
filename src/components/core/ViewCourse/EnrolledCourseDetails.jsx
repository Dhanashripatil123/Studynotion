// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// // EnrolledCourseDetails
// // - Reads courseId from location.pathname.split("/")[3]
// // - Calls POST http://localhost:4000/api/v1/course/getFullCourseDetails with { courseId }
// // - Expects response.courseContent = [{ _id, sectionName, subSection: [{_id, title, description, videoUrl}] }]
// // - Re-fetches when courseId changes

// export default function EnrolledCourseDetails() {
//   const location = useLocation();
//   const courseId = location?.pathname?.split("/")[3];

//   const [courseContent, setCourseContent] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!courseId) {
//       setCourseContent([]);
//       setError(null);
//       return;
//     }

//     let cancelled = false;
//     const controller = new AbortController();

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       setCourseContent([]);

//       try {
//         // Use POST because server's authenticated full details uses POST in this project
//         const res = await axios.post(
//           "http://localhost:4000/api/v1/course/getFullCourseDetails",
//           { courseId },
//           { signal: controller.signal, timeout: 10000 }
//         );

//         if (cancelled) return;

//         const payload = res?.data?.data ?? res?.data ?? {};
//         const content = payload?.courseContent || payload?.courseSectionData || payload?.sections || [];

//         setCourseContent(Array.isArray(content) ? content : []);
//       } catch (err) {
//         if (cancelled) return;
//         const message = err?.response?.data?.message || err?.message || "Failed to load course";
//         setError(message);
//         setCourseContent([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       cancelled = true;
//       controller.abort();
//     };
//   }, [courseId]);

//   if (!courseId) return null;

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-red-400">Error: {error}</div>;

//   if (!courseContent || courseContent.length === 0) {
//     return <div className="p-4 text-yellow-400">No sections found for this course.</div>;
//   }

//   return (
//     <div className="p-4 text-white">
//       {courseContent.map((section) => (
//         <div key={section._id} className="mb-4">
//           <div className="font-semibold mb-2">{section.sectionName}</div>
//           <div className="ml-3">
//             {(section.subSection || []).map((sub) => (
//               <div key={sub._id} className="flex items-center gap-2 mb-1">
//                 <span>•</span>
//                 <span>{sub.title}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
