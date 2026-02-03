import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'
import { getInstructorData, fetchInstructorCourses } from '../../../../services/operations/profile'

function Instructor() {
     const { token } = useSelector((state) => state.auth)
     const { user } = useSelector((state) => state.profile)
     const [loading, setLoading] = useState(false)
     const [courses, setCourses] = useState([])
     const [instructorData, setInstructorData] = useState([])

     useEffect(() => {
          const getCoursedatawithStar = async () => {
               setLoading(true)
               try {
                    const instructorApiData = await getInstructorData(token)
                    const result = await fetchInstructorCourses(token)

                    console.log('instructorApiData', instructorApiData)

                    if (instructorApiData && instructorApiData.length) {
                         setInstructorData(instructorApiData)
                    }

                    if (result && result.length) {
                         setCourses(result)
                    }
               } catch (err) {
                    console.error('Error loading instructor dashboard', err)
               } finally {
                    setLoading(false)
               }
          }

          getCoursedatawithStar()
     }, [token])

     const totalAmount = instructorData?.reduce((acc, curr) => acc + (curr.totalAmountGenerated || 0), 0)
     const totalStudents = instructorData?.reduce((acc, curr) => acc + (curr.totalStudentsEnrolled || 0), 0)

     return (
          <div className="min-h-screen bg-gray-900 text-white p-8">
               <div className="flex items-center justify-between mb-8">
                    <div>
                         <h1 className="text-4xl font-bold text-yellow-400">Hi {user?.firstName || 'Instructor'}</h1>
                         <p className="text-gray-400 text-lg mt-2">Welcome back — here's your instructor dashboard</p>
                    </div>
                    <div>
                         <Link to="/dashboard/add-course" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-3">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                   <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                              </svg>
                              Add Course
                         </Link>
                    </div>
               </div>

               {loading ? (
                    <div className="text-center py-12">Loading...</div>
               ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                         <div className="lg:col-span-2 space-y-8">
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                                   <InstructorChart courses={instructorData} />
                              </div>

                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                                   <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Statistics</h3>
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
                                             <div className="text-sm text-gray-300 mb-2">Total Students</div>
                                             <div className="text-3xl font-bold text-yellow-400">{totalStudents}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
                                             <div className="text-sm text-gray-300 mb-2">Total Income</div>
                                             <div className="text-3xl font-bold text-yellow-400">Rs {totalAmount}</div>
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1">
                                             <div className="text-sm text-gray-300 mb-2">Total Courses</div>
                                             <div className="text-3xl font-bold text-yellow-400">{courses?.length}</div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="space-y-8">
                              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                                   <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Your Courses</h3>
                                        <Link to="/dashboard/my-courses" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors duration-200">View all →</Link>
                                   </div>

                                   {courses && courses.length > 0 ? (
                                        <div className="space-y-4">
                                             {courses.slice(0, 5).map((c) => (
                                                  <div key={c._id || c.courseName} className="flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group">
                                                       <div className="relative">
                                                            <img src={c.thumbnail || c.courseThumbnailUrl} alt={c.courseName} className="w-24 h-16 object-cover rounded-lg border border-gray-600" />
                                                            <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                                       </div>
                                                       <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-2">
                                                                 <p className="font-bold text-lg text-white group-hover:text-yellow-300 transition-colors duration-200">{c.courseName}</p>
                                                                 <p className="text-yellow-400 font-semibold text-lg">Rs {c.price || 0}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                                 <div className="flex items-center gap-1">
                                                                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                                           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                                      </svg>
                                                                      {(c.studentEnrolled && c.studentEnrolled.length) || (c.studentsEnrolled && c.studentsEnrolled.length) || 0} students
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             ))}
                                        </div>
                                   ) : (
                                        <div className="text-center py-8">
                                             <div className="text-gray-400 mb-4">
                                                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                  </svg>
                                                  <p className="text-lg">You have not created any course yet.</p>
                                             </div>
                                             <Link to={'/dashboard/add-course'} className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                       <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                                                  </svg>
                                                  Create a course
                                             </Link>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               )}
          </div>
     )
}

export default Instructor
