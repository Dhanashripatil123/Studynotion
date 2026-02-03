import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoDetaileSidebar from '../components/core/ViewCourse/VideoDetaileSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { useDispatch } from 'react-redux';
import { getFullDetailsofCourse } from '../services/operations/courseDetailsAPI';
import { setCourseSectionData, setEntireCourseData } from '../slices/viewCoursesSlice';
import { setCompletedLectures,  setTotalNoOfLectures } from '../slices/viewCoursesSlice';
function ViewCourse() {
   
    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const entireCourse = useSelector((state) => (state.ViewCourse?.courseEntireData || state.viewCourse?.courseEntireData || {}));
    const totalLectures = useSelector((state) => (state.ViewCourse?.totalNoOfLectures ?? state.viewCourse?.totalNoOfLectures ?? 0));
    const completed = useSelector((state) => (state.ViewCourse?.completedLectures || state.viewCourse?.completedLectures || []));

    useEffect(() => {
        // Fetch course details or any other data if needed using courseId and token
            const setCourseSpecifiDetails = async () => {
                try {
                    const resp = await getFullDetailsofCourse(courseId, token);
                    // normalize: the API helper returns an object like { success: true, data: { ...course } }
                    const payload = (resp && resp.success && resp.data) ? resp.data : resp || {};

                        // course sections may be under several keys depending on server version
                        const sectionData = payload.courseContent || payload.courseSectionData || payload.sections || [];

                        // completed lectures may be named differently
                        let completed = payload.completedvideos || payload.completedVideos || payload.completedLectures || [];

                        // If server didn't return completed array, try to read from cached enrolled courses in localStorage
                        if ((!completed || !Array.isArray(completed) || completed.length === 0) && typeof window !== 'undefined') {
                            try {
                                const enrolledCache = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
                                const cached = (enrolledCache || []).find(c => (c._id || c.courseId || c.id) === courseId);
                                if (cached && Array.isArray(cached.completedLecturesArray) && cached.completedLecturesArray.length) {
                                    completed = cached.completedLecturesArray;
                                }
                            } catch (e) {
                                // ignore parse errors
                            }
                        }

                        // dispatch normalized data into the viewCourse slice
                        dispatch(setCourseSectionData(sectionData));
                        dispatch(setEntireCourseData(payload));
                        dispatch(setCompletedLectures(completed));

                        // calculate total lectures
                        const lectureCount = Array.isArray(sectionData)
                            ? sectionData.reduce((acc, s) => acc + ((s.subSection || s.lectures || s.subsection || s.subSections || []).length), 0)
                            : 0;
                        dispatch(setTotalNoOfLectures(lectureCount));
                } catch (err) {
                    console.error('Failed to load course details in ViewCourse', err);
                }
            }
            
            setCourseSpecifiDetails();
        // Example: dispatch(fetchCourseDetails(courseId, token));
    }, [courseId, token, dispatch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-gray-700">
                <div className="mx-auto w-11/12 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-xl">
                                    {entireCourse?.courseName?.charAt(0) || 'C'}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{entireCourse?.courseName || 'Course Title'}</h1>
                                <p className="text-gray-400 text-sm">
                                    {completed?.length || 0} of {totalLectures} lectures completed
                                </p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="hidden md:block w-64">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-400">Progress</span>
                                <span className="text-sm font-medium text-yellow-400">
                                    {totalLectures > 0 ? Math.round((completed?.length || 0) / totalLectures * 100) : 0}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${totalLectures > 0 ? Math.round((completed?.length || 0) / totalLectures * 100) : 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto w-11/12 py-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
                {/* Sidebar (left) - Enhanced */}
                <div className="order-2 lg:order-1">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-700/50">
                        <VideoDetaileSidebar setReviewModal={setReviewModal} initialCourseData={entireCourse} />
                    </div>
                </div>

                {/* Main content (right) - Enhanced */}
                <div className="order-1 lg:order-2">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
                        {/* Course Header Card */}
                        <div className="mb-8 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-xl p-6 border border-gray-600/50">
                            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-center">
                                <div className="relative group">
                                    <img
                                        src={entireCourse?.thumbnail || entireCourse?.courseThumbnailUrl || 'https://via.placeholder.com/320x180'}
                                        alt={entireCourse?.courseName}
                                        className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                        <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">
                                            Continue Learning
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">{entireCourse?.courseName || 'Course Title'}</h2>
                                        <p className="text-gray-400 text-lg">{entireCourse?.courseDescription || 'Course description not available'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-yellow-400">{totalLectures}</div>
                                            <div className="text-sm text-gray-400">Total Lectures</div>
                                        </div>
                                        <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                                            <div className="text-2xl font-bold text-green-400">{completed?.length || 0}</div>
                                            <div className="text-sm text-gray-400">Completed</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400">⭐</span>
                                            <span className="text-white font-medium">
                                                {entireCourse?.rating || entireCourse?.averageRating || '4.5'}
                                            </span>
                                            <span className="text-gray-400">({entireCourse?.ratingAndReview?.length || 0} reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video Content Area */}
                        <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
    )
}

export default ViewCourse;
