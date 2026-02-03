import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/profile'
import { deleteCourse as deleteCourseAPI } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../slices/courseSlice'

export default function MyCoursePage() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchInstructorCourses(token)
        setCourses(data || [])
      } catch (err) {
        console.error('Failed to load instructor courses', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [token])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (course) => {
    // populate course slice and enable edit mode, then navigate to add-course
    dispatch(setCourse(course))
    dispatch(setEditCourse(true))
    navigate('/dashboard/add-course')
  }

  const handleDelete = async (courseId) => {
    if (!window.confirm('Delete this course?')) return
    try {
      const resp = await deleteCourseAPI(courseId, token)
      if (resp?.success) {
        // refresh list
        const data = await fetchInstructorCourses(token)
        setCourses(data || [])
      }
    } catch (err) {
      console.error('Failed to delete course', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          My Courses
        </h1>
        <p className="text-gray-400 text-lg">
          Manage and track all your created courses
        </p>
      </div>

      {/* Stats Overview */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">{courses.length}</p>
                <p className="text-sm text-gray-400">Total Courses</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {courses.reduce((total, course) => total + ((course.studentEnrolled && course.studentEnrolled.length) || 0), 0)}
                </p>
                <p className="text-sm text-gray-400">Total Students</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">
                  Rs {courses.reduce((total, course) => total + (course.price || 0), 0)}
                </p>
                <p className="text-sm text-gray-400">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Courses Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Courses</h2>
          <button
            onClick={() => navigate('/dashboard/add-course')}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            Add New Course
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
            <span className="ml-3 text-gray-400">Loading your courses...</span>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
              <p className="text-gray-500">Start creating your first course to share your knowledge with students worldwide.</p>
            </div>
            <button
              onClick={() => navigate('/dashboard/add-course')}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Create Your First Course
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/10 group">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Course Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={course.thumbnail || 'https://via.placeholder.com/320x180?text=No+Image'}
                      alt={course.courseName}
                      className="w-full lg:w-48 h-32 object-cover rounded-lg border border-gray-600 group-hover:border-yellow-400/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 mb-2">
                        {course.courseName}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                        {course.courseDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                        </svg>
                        <span>{(course.studentEnrolled && course.studentEnrolled.length) || 0} students enrolled</span>
                      </div>

                      <div className="flex items-center gap-2 text-blue-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-semibold">Rs {course.price || 0}</span>
                      </div>

                      <div className="flex items-center gap-2 text-purple-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                        </svg>
                        <span>{course.status || 'Draft'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 lg:flex-row">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                      </svg>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
