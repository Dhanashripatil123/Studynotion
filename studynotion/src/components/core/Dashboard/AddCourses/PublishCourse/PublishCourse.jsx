import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { resetCourseState } from '../../../../../slices/courseSlice'
import { fetchCourseDetails } from '../../../../../services/operations/courseDetailsAPI'

export default function PublishCourse() {
  const { course } = useSelector((state) => state.course)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fullCourse, setFullCourse] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    const loadFull = async () => {
      if (!course) return
      // if course already has populated courseContent with lectures, use it
      if (Array.isArray(course.courseContent) && course.courseContent.length > 0 && course.courseContent[0].subSection !== undefined) {
        setFullCourse(course)
        return
      }
      // otherwise fetch full details from server (requires course._id)
      if (course._id) {
        setLoading(true)
        const res = await fetchCourseDetails(course._id)
        if (isMounted && res && res.data) {
          setFullCourse(res.data)
        }
        setLoading(false)
      }
    }
    loadFull()
    return () => { isMounted = false }
  }, [course])

  if (!course && !fullCourse) {
    return (
      <div className='p-6 bg-gray-900 rounded-md text-white'>
        <p className='text-lg'>No course data available.</p>
      </div>
    )
  }

  const useCourse = fullCourse || course

  const totalSections = Array.isArray(useCourse.courseContent) ? useCourse.courseContent.length : 0
  const totalLectures = Array.isArray(useCourse.courseContent) ? useCourse.courseContent.reduce((acc, s) => acc + (Array.isArray(s.subSection) ? s.subSection.length : 0), 0) : 0

  const onDone = () => {
    // Reset course builder state and go to My Courses or Dashboard
    dispatch(resetCourseState())
    navigate('/dashboard/my-courses')
  }

  return (
    <div className='p-6 bg-gray-900 rounded-md text-white'>
      <div className='flex items-center gap-4'>
        <div className='text-green-400 text-4xl'>
          <FaCheckCircle />
        </div>
        <div>
          <h3 className='text-2xl font-semibold'>Course Published</h3>
          <p className='text-gray-400'>Your course has been published successfully.</p>
        </div>
      </div>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-gray-800 p-4 rounded border border-gray-700'>
          <p className='text-sm text-gray-400'>Course Title</p>
          <h4 className='text-lg font-semibold mt-1'>{useCourse.courseName || useCourse.title || 'Untitled Course'}</h4>
        </div>

        <div className='bg-gray-800 p-4 rounded border border-gray-700'>
          <p className='text-sm text-gray-400'>Category</p>
          <p className='mt-1'>{useCourse.category?.name || useCourse.category || 'Uncategorized'}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded border border-gray-700'>
          <p className='text-sm text-gray-400'>Price</p>
          <p className='mt-1'>{useCourse.price ? `₹ ${useCourse.price}` : 'Free'}</p>
        </div>

        <div className='bg-gray-800 p-4 rounded border border-gray-700'>
          <p className='text-sm text-gray-400'>Sections / Lectures</p>
          <p className='mt-1'>{totalSections} sections · {totalLectures} lectures</p>
        </div>
      </div>

      {/* Sections & Lectures */}
      <div className='mt-6'>
        <h4 className='text-lg font-semibold mb-3'>Sections</h4>
        {loading ? (
          <p className='text-gray-400'>Loading sections...</p>
        ) : Array.isArray(useCourse.courseContent) && useCourse.courseContent.length > 0 ? (
          <div className='space-y-3'>
            {useCourse.courseContent.map((sec, idx) => (
              <div key={sec._id || idx} className='bg-gray-800 p-4 rounded border border-gray-700'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-400'>Section</p>
                    <h5 className='font-semibold text-white'>{sec.sectionName || sec.title || `Section ${idx + 1}`}</h5>
                  </div>
                  <p className='text-sm text-gray-400'>{Array.isArray(sec.subSection) ? sec.subSection.length : 0} lectures</p>
                </div>

                {Array.isArray(sec.subSection) && sec.subSection.length > 0 ? (
                  <ul className='mt-3 list-disc list-inside text-gray-300'>
                    {sec.subSection.map((lec) => (
                      <li key={lec._id || lec.title} className='truncate'>{lec.title || lec.name || 'Untitled Lecture'}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-gray-500 mt-2'>No lectures in this section.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-gray-400'>No sections added to this course.</p>
        )}
      </div>

      <div className='mt-6 flex gap-3'>
        <button onClick={onDone} className='px-4 py-2 bg-yellow-500 text-black rounded-md font-semibold'>Go To My Courses</button>
        <button onClick={() => navigate(-1)} className='px-4 py-2 bg-gray-700 text-white rounded-md'>Back</button>
      </div>
    </div>
  )
}
