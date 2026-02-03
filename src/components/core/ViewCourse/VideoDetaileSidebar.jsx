// import React, { useState, useEffect } from 'react'
// import {  useForm } from 'react-hook-form';
// import IconButton from '../../common/IconButton';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function VideoDetaileSidebar({setReviewModal}) {
//       const [activeStatus, setActiveStatus] = useState(false);
//       const [videoBarActive, setVideobarActive] = useState(false);
//       const navigate = useNavigate();
//       const {sectionId, subsectionId, courseId} = useParams();
//       const {
//            courseSectionData,
//            courseEntireData,
//            totalNoOfLectures,
//            completedLectures,
//       } = useSelector((state) => state.viewCourse);
                                             
//       useEffect(()=>{
//           (()=>{
//               if(!courseSectionData.length) return;
//               const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
             
//               const currentSubsectionIndex = courseSectionData?.[currentSectionIndex].lectures.findIndex(
//                   (data) => data._id === subsectionId
//               );
//              const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubsectionIndex]?._id;
//              //set current section here
//              setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
//              //set current subsection here
//              setVideobarActive(activeSubSectionId);

//           })                                        
//       }, [courseSectionData,courseEntireData,sectionId,subsectionId,location.pathname]);                                      

//       return (
//           <div>
//               {/* for button and heading                                        */}
//              <div>
//                   {/* for heading                                 */}
//                   <div onClick={()=>{
//                         navigate('/dashboard/entrolled-course')                          
//                   }}>
//                        Back to course                           
//                   </div>
//               </div>  
//               {/* for heading and button end here                                     */}
//                 <IconButton text='add review' onClick={()=>{setReviewModal}}></IconButton>
//               <div>

//                <div>
//                   <p>{courseEntireData?.courseName}</p>
//                     <p>{completedLectures?.length}/{totalNoOfLectures} Lectures completed</p>                                
//                </div>

//                  for section and subsection data here
//                  <div>
//                     {
//                       courseSectionData.map((course, index) => (
//                           <div
//                             onClick={()=>setActiveStatus(course?._id)}
//                             key={index}
//                           >
//                               {/* section 2                     */}
//                               <div>
//                                   <p>{course?.sectionName}</p>
//                                   {/* add arrow icon here and handle rotate logic */}
//                                   <p>{course?.lectures?.length} Lectures</p>
//                               </div>

//                               {/* subsection */}
//                               <div>
//                               {
//                                 activeStatus === course?._id && (
//                                   <div>
//                                     {
//                                        course.subSection.map((topic,index) => {  
//                                         <div className={`flex gap-3 p-4 ${videoBarActive === topic?._id ? 'bg-yellow-400 text-richblack-800' : 'bg-richblack-900 text-white'

//                                         }`}  
//                                          key={index}
//                                           onClick={()=>{
                                             
//                                               navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/subsection/${topic?._id}`

//                                               )
//                                               setVideobarActive(topic?._id)
//                                           }}
//                                           >
                                          

//                                           <input
//                                           type='checkbox'
//                                           checked={completedLectures?.includes(topic?._id)}
//                                           onChange={()=>{

//                                           }}
//                                           />
//                                         </div>
//                                      })}
//                                   </div>
//                               )}
//                               </div>

//                              </div>  

//                       ) )}  
                                               
//                  </div>

//               </div>
//           </div>                                                                                             
//       )
// }

// export default VideoDetaileSidebar

import React, { useState, useEffect } from "react";
import IconButton from "../../common/IconButton";
import { FaPlayCircle } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFullCourseDetailsById } from "../../../services/operations/courseDetailsAPI";
import {setCourseSubSectionData, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, setCompletedLectures } from "../../../slices/viewCoursesSlice";

function VideoDetaileSidebar({ setReviewModal, initialCourseData = null }) {
  const [activeStatus, setActiveStatus] = useState(false);
  const [videoBarActive, setVideoBarActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subsectionId } = useParams();

  const viewCourseState = useSelector((state) => state.ViewCourse || {});
  const { token } = useSelector((state) => state.auth || {});
  const dispatch = useDispatch();

  const {
    courseSectionData = [],
    courseSubSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = [],
  } = viewCourseState;

  // If redux state isn't populated yet, prefer initialCourseData passed from parent
  const sourceCourseSectionData = (Array.isArray(courseSectionData) && courseSectionData.length)
    ? courseSectionData
    : (initialCourseData?.courseSectionData || initialCourseData?.courseContent || initialCourseData?.sections || []);

  const sourceCourseSubSectionData = (Array.isArray(courseSubSectionData) && courseSubSectionData.length)
    ? courseSubSectionData
    : (initialCourseData?.courseSectionData || initialCourseData?.courseContent || initialCourseData?.sections || []);

  const sourceCourseEntireData = (Object.keys(courseEntireData || {}).length)
    ? courseEntireData
    : (initialCourseData || {});

  const sourceCompletedLectures = (Array.isArray(completedLectures) && completedLectures.length)
    ? completedLectures
    : (initialCourseData?.completedLectures || initialCourseData?.completedvideos || initialCourseData?.completedVideos || []);

  const sourceTotalNoOfLectures = totalNoOfLectures || initialCourseData?.totalNoOfLectures || sourceCourseSectionData.reduce((acc, s) => acc + ((s.lectures || []).length), 0);

  // Debug: log the resolved source data so we can see what this sidebar actually receives at runtime
  useEffect(() => {
    console.log('[VideoDetaileSidebar] sourceCourseSectionData:', sourceCourseSectionData);
    console.log('[VideoDetaileSidebar] sourceCourseEntireData:', sourceCourseEntireData);
    console.log('[VideoDetaileSidebar] sourceCourseSubSectionData:', sourceCourseSubSectionData);
    console.log('[VideoDetaileSidebar] sourceCompletedLectures:', sourceCompletedLectures);
  }, [sourceCourseSectionData, sourceCourseEntireData, sourceCompletedLectures,courseSubSectionData]);

  // ------------------------------
  // SET ACTIVE SECTION + SUBSECTION
  // ------------------------------
  useEffect(() => {

    if (!sourceCourseSectionData.length) return;

    const currentSectionIndex = sourceCourseSectionData.findIndex((sec) => sec._id === sectionId);
    if (currentSectionIndex === -1) return;

    const currentSection = sourceCourseSectionData[currentSectionIndex] || {};
    const subsections = currentSection.subSection || currentSection.lectures || [];

    const currentSubIndex = subsections.findIndex((sub) => sub._id === subsectionId);
    const activeSubId = subsections?.[currentSubIndex]?._id;

    setActiveStatus(currentSection._id);
    if (activeSubId) setVideoBarActive(activeSubId);
  }, [
    // watch source arrays and URL params
    sourceCourseSectionData,
    sourceCourseEntireData,
    sectionId,
    subsectionId,
    location.pathname,
  ]);

  const percent = sourceTotalNoOfLectures > 0 ? Math.round(((sourceCompletedLectures?.length || 0) / sourceTotalNoOfLectures) * 100) : 0;

  return (
    <div className="text-white p-4 w-full max-w-xs bg-richblack-900 rounded shadow-md">

      {/* BACK BUTTON */}
      <div className="flex items-center justify-between mb-12">
        <button
          className="flex items-center gap-3 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-semibold text-black shadow"
          onClick={() => navigate("/dashboard/enrolled-courses", { state: { courseId: sourceCourseEntireData?._id, progress: percent, completedLectures: sourceCompletedLectures } })}
        >
          <span className="text-lg">←</span>
          <span>Back</span>
        </button>
        <div className="text-xs text-gray-400">{(sourceCourseEntireData?.instructor && (sourceCourseEntireData.instructor.firstName || sourceCourseEntireData.instructor.email)) || ''}</div>
      </div>

      {/* REVIEW BUTTON will be rendered below sections */}

      {/* COURSE INFO */}
      <div className="mt-12">
        {/* Instructor box */}
        <div className="flex items-center gap-3 mb-3">
          <img src={sourceCourseEntireData?.instructor?.image || sourceCourseEntireData?.instructor?.profile || 'https://via.placeholder.com/80'} alt="instructor" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="text-xs text-gray-400">Instructor</div>
            <div className="text-sm font-semibold text-white">{(sourceCourseEntireData?.instructor && (sourceCourseEntireData.instructor.firstName ? `${sourceCourseEntireData.instructor.firstName} ${sourceCourseEntireData.instructor.lastName || ''}` : sourceCourseEntireData.instructor.email)) || 'Instructor'}</div>
          </div>
        </div>

        <p className="text-lg font-extrabold tracking-tight mb-2">{sourceCourseEntireData?.courseName}</p>

        {/* progress boxes */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-800 p-3 rounded border border-gray-700 text-center">
            <div className="text-xs text-gray-400">Lectures completed</div>
            <div className="text-lg font-semibold text-yellow-400">{sourceCompletedLectures?.length || 0}</div>
            <div className="text-xs text-gray-500">of {sourceTotalNoOfLectures || 0}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded border border-gray-700 text-center">
            <div className="text-xs text-gray-400">Progress</div>
            <div className="text-lg font-semibold">{percent}%</div>
            <div className="w-full bg-richblack-800 rounded h-2 mt-2 overflow-hidden">
              <div style={{ width: `${percent}%` }} className="bg-yellow-400 h-2 rounded transition-all" />
            </div>
          </div>
        </div>

        <div className="mt-1">
          <button
            className="text-sm text-blue-400 underline"
            onClick={async () => {
              try {
                if (!sourceCourseEntireData?._id) return;
                const resp = await fetchFullCourseDetailsById(sourceCourseEntireData._id, token);
                const data = resp?.data || resp;
                const sectionData = data?.courseSectionData || data?.courseContent || data?.sections || [];
                dispatch(setCourseSectionData(sectionData));
                dispatch(setEntireCourseData(data || {}));
                dispatch(setTotalNoOfLectures(data?.totalNoOfLectures || sectionData.reduce((acc, s) => acc + ((s.lectures || []).length), 0)));
                dispatch(setCompletedLectures(data?.completedLectures || data?.completedvideos || []));
              } catch (err) {
                console.error('[VideoDetaileSidebar] reload error', err);
              }
            }}
          >
            Reload sections
          </button>
        </div>
      </div>

      {/* SECTIONS + SUBSECTIONS */}
      <div className="mt-14">
        {sourceCourseSectionData.length === 0 ? (
          <div className="p-4 text-sm text-yellow-400">No sections added to this course yet.</div>
        ) : (
          sourceCourseSectionData.map((section) => (
            <div key={section._id} className="mb-4">

              {/* SECTION HEADER */}
              <div
                className="p-3 bg-gray-700 cursor-pointer flex justify-between items-center rounded-lg border-l-4 border-yellow-400"
                onClick={() => setActiveStatus(section._id)}
              >
                <p className="font-semibold text-white">{section.sectionName}</p>
                <p className="text-sm text-gray-300">{(
                  (section.subSection || section.lectures || section.subsection || section.subSections || [])
                ).length} Lectures</p>
              </div>

              {/* SUBSECTIONS */}
              {activeStatus === section._id && (
                <div className="ml-4 border-l border-gray-700 rounded pl-3 mt-2">
                  {((section.subSection || section.lectures || section.subsection || section.subSections || [])).map((topic, tIndex) => (
                    <div
                      key={`${section._id}-${topic?._id || tIndex}`}
                      className={`p-3 mb-2 flex items-center gap-3 cursor-pointer rounded ${
                        videoBarActive === topic._id
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${sourceCourseEntireData?._id}/section/${section._id}/subsection/${topic._id}`,
                          { state: { autoplay: true } }
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                      <div className="text-yellow-400">
                        <FaPlayCircle />
                      </div>
                      <input
                        type="checkbox"
                        checked={sourceCompletedLectures?.includes(topic._id)}
                        readOnly
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{topic.title || topic.titleName || topic.name}</div>
                        <div className="text-xs text-gray-400">{topic.duration || topic.time || ''}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {/* REVIEW BUTTON (moved below sections) */}
      <div className="mt-14">
        <button
          onClick={() => setReviewModal(true)}
          className="w-full inline-flex justify-center items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md font-semibold shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.371 2.45a1 1 0 00-.364 1.118l1.287 3.95c.3.921-.755 1.688-1.54 1.118l-3.371-2.45a1 1 0 00-1.176 0l-3.371 2.45c-.785.57-1.84-.197-1.54-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.063 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
          </svg>
          Add Review
        </button>
      </div>
      {/* debug UI removed */}
    </div>
  );
}

export default VideoDetaileSidebar;
