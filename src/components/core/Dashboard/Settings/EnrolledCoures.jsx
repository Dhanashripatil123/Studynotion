import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import ProgressBar from "@ramonak/react-progress-bar";
import getUserEnrolledCourses from '../../../../services/operations/profile';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFullDetailsofCourse } from '../../../../services/operations/courseDetailsAPI';
import VideoDetaileSidebar from '../../ViewCourse/VideoDetaileSidebar';
import { setCourseSectionData, setEntireCourseData, setCompletedLectures, setTotalNoOfLectures } from '../../../../slices/viewCoursesSlice';
import { useLocation } from 'react-router-dom';


const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getEnrolledCourses = async (useCache = true) => {
        // Prevent multiple simultaneous calls
        if (isLoading) {
            console.log('⏳ getEnrolledCourses already running, skipping...');
            return;
        }

        console.log('🔄 getEnrolledCourses called with useCache:', useCache);
        setIsLoading(true);

        // Always try to load from localStorage first for immediate display
        let cachedCourses = [];
        if (useCache) {
            try {
                const cachedData = localStorage.getItem('enrolledCourses');
                if (cachedData) {
                    cachedCourses = JSON.parse(cachedData);
                    if (Array.isArray(cachedCourses) && cachedCourses.length > 0) {
                        console.log('📦 Loaded cached courses:', cachedCourses.map(c => ({ id: c._id, progress: c.progressPersentage })));
                        setEnrolledCourses(cachedCourses);
                    }
                }
            } catch (e) {
                console.warn('Could not load cached enrolled courses', e);
            }
        }

        // Try to fetch fresh data, but don't override cached data if it fails
        try {
            const response = await getUserEnrolledCourses(token);
            const courses = response || [];

            if (Array.isArray(courses) && courses.length) {
                // The backend API already includes progress data in course.progressPercentage
                // No need to fetch course details again - just use the data from the API
                const enriched = courses.map((course) => ({
                    ...course,
                    progressPersentage: course.progressPercentage || course.progressPersentage || 0,
                    completedLecturesArray: course.completedVideos || course.completedLectures || []
                }));

                console.log('✅ Courses with progress from API:', enriched.map(c => ({ id: c._id, progress: c.progressPersentage })));
                setEnrolledCourses(enriched);
                toast.success("Enrolled courses loaded successfully");

                // Save to localStorage for future use
                try {
                    localStorage.setItem('enrolledCourses', JSON.stringify(enriched));
                } catch (e) {
                    console.warn('Could not persist enrolledCourses to localStorage', e);
                }

                // Save to localStorage for future use
                try {
                    localStorage.setItem('enrolledCourses', JSON.stringify(enriched));
                } catch (e) {
                    console.warn('Could not persist enrolledCourses to localStorage', e);
                }
            } else {
                // If no courses from API, keep cached data if available
                if (!cachedCourses.length) {
                    setEnrolledCourses([]);
                    toast.info("No enrolled courses found");
                }
            }
        } catch (error) {
            console.error("Unable to fetch Enrolled courses from API:", error);
            // If API fails completely, use cached data if available
            if (cachedCourses.length > 0) {
                setEnrolledCourses(cachedCourses);
                toast.info("Showing cached course data - check your connection");
            } else {
                setEnrolledCourses([]);
                toast.error("Failed to load enrolled courses - check your connection");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) return; // Don't run if no token

        const init = async () => {
            await getEnrolledCourses(true); // Use cache for immediate display
            const navigatedCourseId = location?.state?.courseId;
            const navigatedProgress = location?.state?.progress;
            const navigatedCompletedLectures = location?.state?.completedLectures;

            if (navigatedCourseId && (navigatedProgress !== undefined || navigatedCompletedLectures)) {
                console.log('Updating progress for navigated course:', navigatedCourseId, 'Progress:', navigatedProgress, 'Completed:', navigatedCompletedLectures);

                // Use the progress data passed from the course view instead of refetching
                const percent = navigatedProgress !== undefined ? navigatedProgress :
                    (navigatedCompletedLectures ? Math.round((navigatedCompletedLectures.length / (navigatedCompletedLectures.length + 1)) * 100) : 0); // fallback calculation

                console.log('Calculated progress:', percent);

                // Update the specific course's progress in the state
                setEnrolledCourses((prev) => (prev || []).map((c) => ((c._id || c.courseId || c.id) === navigatedCourseId ? {
                    ...c,
                    progressPersentage: percent,
                    completedLecturesArray: navigatedCompletedLectures || c.completedLecturesArray || []
                } : c)));

                console.log(' Updated state with progress:', percent);

                // Update localStorage as well
                try {
                    const cachedCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
                    const updatedCachedCourses = cachedCourses.map((c) => ((c._id || c.courseId || c.id) === navigatedCourseId ? {
                        ...c,
                        progressPersentage: percent,
                        completedLecturesArray: navigatedCompletedLectures || c.completedLecturesArray || []
                    } : c));
                    localStorage.setItem('enrolledCourses', JSON.stringify(updatedCachedCourses));
                } catch (e) {
                    console.warn('Could not update cached progress', e);
                }

                // No need to fetch fresh data since we already have the latest progress from navigation
            }
        };
        init();
    }, [token]); // Only run when token changes

    const computeAverageRating = (c) => {
        if (!c) return '0.00';
        const arr = c.ratingAndReview || c.reviews || [];
        if (Array.isArray(arr) && arr.length) {
            const sum = arr.reduce((s, r) => s + (r?.rating || r?.value || 0), 0);
            return (sum / arr.length).toFixed(2);
        }
        if (typeof c.avgRating === 'number') return c.avgRating.toFixed(2);
        if (c.averageRating) return Number(c.averageRating).toFixed(2);
        return '0.00';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Enrolled Courses
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        Continue your learning journey with your enrolled courses
                    </p>
                </div>

                {/* Courses Container */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-gray-700/50 shadow-2xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-3xl"></div>
                    <div className="relative z-10">
                        {enrolledCourses === null ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                                <p className="text-gray-400">Loading your enrolled courses...</p>
                            </div>
                        ) : enrolledCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold text-gray-300 mb-2">No enrolled courses yet</h3>
                                <p className="text-gray-400 mb-6">Start your learning journey by enrolling in some amazing courses!</p>
                                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25">
                                    Browse Courses
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {enrolledCourses.map((course) => {
                                    const courseId = course._id || course.courseId || course.id;
                                    return (
                                        <div
                                            key={courseId}
                                            className="flex flex-col md:flex-row items-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 gap-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-yellow-500/50 group"
                                            onClick={async () => {
                                                        try {
                                                            // Open the sidebar and preload course details
                                                            setSelectedCourse(course);
                                                            setShowSidebar(true);
                                                            const response = await fetchFullCourseDetailsById(courseId, token);
                                                            const data = response?.data || response || null;
                                                            setSelectedCourseDetails(data);
                                                            if (data) {
                                                                const sectionData = data?.courseSectionData || data?.courseContent || data?.sections || [];
                                                                const completed = data?.completedvideos || data?.completedVideos || data?.completedLectures || course?.completedVideos || course?.completedLectures || course?.completed || [];
                                                                dispatch(setCourseSectionData(sectionData));
                                                                dispatch(setEntireCourseData(data));
                                                                dispatch(setCompletedLectures(completed));
                                                                const lectureCount = Array.isArray(sectionData) ? sectionData.reduce((acc, s) => acc + ((s.subSection || s.lectures || []).length), 0) : 0;
                                                                dispatch(setTotalNoOfLectures(lectureCount));
                                                            }
                                                            // Do not auto-navigate — user stays in enrolled courses view and sees sidebar.
                                                        } catch (err) {
                                                            console.error('Failed to open enrolled course details', err);
                                                        }
                                            }}
                                        >
                                            {/* Course Image */}
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={course.thumbnail || course.courseThumbnailUrl || 'https://via.placeholder.com/320x180'}
                                                    alt={course.courseName}
                                                    className="w-32 h-20 md:w-40 md:h-28 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>

                                            {/* Course Info */}
                                            <div className="flex-1 space-y-2">
                                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                                                    {course.courseName}
                                                </h3>
                                                <p className="text-gray-300 text-sm md:text-base max-w-2xl line-clamp-2">
                                                    {course.courseDescription}
                                                </p>
                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <span>⏱️</span>
                                                        <span>Duration: {course?.totalDuration || '—'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <span>👥</span>
                                                        <span>Enrolled: {(course.studentEnrolled && course.studentEnrolled.length) || (course.studentsEnrolled && course.studentsEnrolled.length) || 0}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Progress Section */}
                                            <div className="w-full md:w-56 flex-shrink-0">
                                                <div className="text-center">
                                                    <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                                                        {(() => {
                                                            const progress = course.progressPersentage || 0;
                                                            console.log('📊 Rendering progress for course', courseId, ':', progress + '%');
                                                            return progress;
                                                        })()}%
                                                    </div>
                                                    <div className="text-sm text-gray-400 mb-3">Progress</div>
                                                    <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full rounded-full transition-all duration-500 ease-out"
                                                            style={{ width: `${course.progressPersentage || 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar overlay - shows EnrolledCourseDetails when a course is clicked */}
            {showSidebar && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => {
                        setShowSidebar(false);
                    }} />
                    <div className="w-96 bg-gray-900/95 backdrop-blur-sm border-l border-yellow-400/50 rounded-l-3xl p-6 text-white h-full shadow-2xl overflow-auto">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        className="text-sm text-yellow-300 font-semibold hover:text-yellow-400 transition-colors px-3 py-2 rounded-lg hover:bg-yellow-500/10"
                                        onClick={() => {
                                            setShowSidebar(false);
                                        }}
                                    >
                                        ✕ Close
                                    </button>
                                    <button
                                        className="text-sm text-white bg-yellow-500/80 hover:bg-yellow-400 px-3 py-2 rounded-lg font-semibold"
                                        onClick={() => {
                                            // Open the full course page if the user wants the complete view
                                            const id = selectedCourse?._id || selectedCourse?.courseId || selectedCourse?.id;
                                            if (id) navigate(`/view-course/${id}`);
                                        }}
                                    >
                                        Open Full View
                                    </button>
                                </div>
                                <div className="text-sm text-gray-300 bg-gray-800/50 px-3 py-1 rounded-full">
                                    Enrolled Course
                                </div>
                            </div>

                            <VideoDetaileSidebar setReviewModal={() => { }} initialCourseData={selectedCourseDetails} />

                            {selectedCourse && (
                                <div className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                                    {selectedCourse.thumbnail ? (
                                        <img
                                            src={selectedCourse.thumbnail}
                                            alt={selectedCourse.courseName}
                                            className="w-full h-32 object-cover rounded-lg mb-4 shadow-lg"
                                        />
                                    ) : null}

                                    <h3 className="text-lg font-bold text-white mb-2">{selectedCourse.courseName}</h3>
                                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{selectedCourse.courseDescription}</p>

                                    <div className="bg-gray-700/50 rounded-lg p-3 text-sm text-gray-200 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Rating:</span>
                                            <span className="text-yellow-400 font-semibold">{computeAverageRating(selectedCourse)}</span>
                                        </div>
                                        {selectedCourse.tag && (
                                            <div className="flex justify-between">
                                                <span>Tag:</span>
                                                <span>{selectedCourse.tag?.name || selectedCourse.tag}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Progress:</span>
                                            <span className="text-green-400 font-semibold">{selectedCourse.progressPersentage || 0}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses
