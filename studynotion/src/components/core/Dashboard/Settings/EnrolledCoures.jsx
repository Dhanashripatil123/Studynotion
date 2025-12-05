import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import getUserEnrolledCourses from '../../../../services/operations/profile';
import { FiPlay, FiClock } from 'react-icons/fi';

const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    const getEnrolledCourses = async () => {
        try {
            setLoading(true);
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("Unable to fetch Enrolled", error);
            setEnrolledCourses([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, [token]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Enrolled Courses</h1>
                <p className="text-gray-400">Continue learning from your enrolled courses</p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center h-96">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin border-4 border-gray-700 border-t-yellow-500 rounded-full w-12 h-12 mb-4"></div>
                        <p className="text-gray-400">Loading your courses...</p>
                    </div>
                </div>
            ) : !enrolledCourses || enrolledCourses.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
                    <p className="text-xl text-gray-400 mb-4">You have not enrolled in any courses yet</p>
                    <button 
                        onClick={() => navigate("/catalog")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <div>
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="font-semibold text-lg">Course</div>
                        <div className="font-semibold text-lg">Duration</div>
                        <div className="font-semibold text-lg">Progress</div>
                        <div className="font-semibold text-lg">Action</div>
                    </div>

                    {/* Courses Grid */}
                    <div className="space-y-4">
                        {enrolledCourses.map((course, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-500 transition">
                                <div className="grid md:grid-cols-4 gap-4 p-4 items-center">
                                    {/* Course Info */}
                                    <div className="flex items-center gap-4 md:col-span-1">
                                        <img 
                                            src={course.thumbnail} 
                                            alt={course.courseName}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div className="hidden md:block">
                                            <p className="font-bold text-white text-lg">{course.courseName}</p>
                                            <p className="text-gray-400 text-sm">{course.courseDescription?.substring(0, 40)}...</p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="md:col-span-1 flex items-center gap-2">
                                        <FiClock className="text-yellow-500" size={20} />
                                        <span className="text-gray-300">{course.totalDuration || "N/A"}</span>
                                    </div>

                                    {/* Progress */}
                                    <div className="md:col-span-1">
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-400 mb-1">Progress: {course.progressPercentage || 0}%</p>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${course.progressPercentage || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="md:col-span-1 flex justify-end">
                                        <button 
                                            onClick={() => navigate(`/courses/${course._id}`)}
                                            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-semibold transition"
                                        >
                                            <FiPlay size={18} />
                                            Continue
                                        </button>
                                    </div>
                                </div>

                                {/* Mobile view course title */}
                                <div className="md:hidden p-4 bg-gray-700">
                                    <p className="font-bold text-white">{course.courseName}</p>
                                    <p className="text-gray-400 text-sm mt-1">{course.courseDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses
