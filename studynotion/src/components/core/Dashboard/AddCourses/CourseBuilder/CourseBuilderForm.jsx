import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import IconButton from '../../../../common/IconButton'
import { FaCirclePlus, FaSpinner } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { FaCircleArrowRight } from "react-icons/fa6"
import { setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import NestedView from './NestedView'
import { setCourse } from '../../../../../slices/courseSlice'

export default function CourseBuilderForm() {

  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch()

  // Local state to maintain sections and lectures per user's request
  const [localCourse, setLocalCourse] = useState(() => ({ courseContent: [] }))
  const [sectionName, setSectionName] = useState("")
  const [openSectionId, setOpenSectionId] = useState(null)
  const [highlightLectureId, setHighlightLectureId] = useState(null)
  const [loading, setLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (course && Array.isArray(course.courseContent)) {
      setLocalCourse({ courseContent: course.courseContent });
    }
    // if navigated here with state (from ViewLecturePage), open the section and optionally highlight lecture
    if (location?.state) {
      const { openSectionId: incomingSectionId, highlightLectureId: incomingLectureId } = location.state || {}
      if (incomingSectionId) setOpenSectionId(incomingSectionId)
      if (incomingLectureId) setHighlightLectureId(incomingLectureId)
    }
  }, [course, location])

  const generateId = () => `${Date.now().toString(36)}-${Math.floor(Math.random()*1000)}`

  const handleCreateSection = (e) => {
    e && e.preventDefault && e.preventDefault()
    const name = sectionName.trim()
    if (!name) {
      toast.error('Section name is required')
      return
    }
    const newSection = {
      _id: generateId(),
      sectionName: name,
      subSection: [],
    }
    const next = { courseContent: [...(localCourse.courseContent||[]), newSection] }
    setLocalCourse(next)
    // update redux course to reflect local changes so Publish page sees real values
    dispatch(setCourse({ ...(course || {}), ...next }))
    setSectionName("")
    setOpenSectionId(newSection._id)
  }

  const handleAddLecture = (sectionId, lecture) => {
    // sanitize lecture: do not store File objects in redux state
    const sanitized = { ...lecture, _id: generateId() }
    if (sanitized.videoFile && sanitized.videoFile instanceof File) {
      try {
        sanitized.videoUrl = URL.createObjectURL(sanitized.videoFile)
      } catch (e) {
        sanitized.videoUrl = ''
      }
      // keep some metadata but remove the File object
      sanitized.videoName = sanitized.videoFile.name
      sanitized.videoSize = sanitized.videoFile.size
      delete sanitized.videoFile
    }
    const nextContent = (localCourse.courseContent||[]).map((s) => s._id === sectionId ? { ...s, subSection: [...(s.subSection||[]), sanitized] } : s)
    const next = { courseContent: nextContent }
    setLocalCourse(next)
    dispatch(setCourse({ ...(course || {}), ...next }))
  }

  const handleDeleteLecture = (sectionId, lectureId) => {
    const nextContent = (localCourse.courseContent||[]).map((s) => s._id === sectionId ? { ...s, subSection: (s.subSection||[]).filter(l => l._id !== lectureId) } : s)
    const next = { courseContent: nextContent }
    setLocalCourse(next)
    dispatch(setCourse({ ...(course || {}), ...next }))
  }

  const handleDeleteSection = (sectionId) => {
    const nextContent = (localCourse.courseContent||[]).filter(s => s._id !== sectionId)
    const next = { courseContent: nextContent }
    setLocalCourse(next)
    dispatch(setCourse({ ...(course || {}), ...next }))
  }

  const goBack = () => {
    dispatch(setStep(1))
  }

  const goToNext = () => {
    const contents = localCourse.courseContent || []
    if (contents.length === 0) {
      toast.error('Please add at least one section')
      return
    }
    const hasEmpty = contents.some(s => !Array.isArray(s.subSection) || s.subSection.length === 0)
    if (hasEmpty) {
      toast.error('Please add at least one lecture in each section')
      return
    }
    dispatch(setStep(3))
  }

  const canProceed = Array.isArray(localCourse.courseContent) && localCourse.courseContent.length > 0 && localCourse.courseContent.every((section) => Array.isArray(section.subSection) && section.subSection.length > 0)

  return (
    <div className='text-white'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white'>Course Builder</h2>
        <p className='text-gray-400 text-sm mt-1'>Add sections and lectures for your course here</p>
      </div>

      <form onSubmit={handleCreateSection} className='space-y-6'>
        <div className='bg-gray-800 p-6 rounded-lg border border-gray-700'>
          <label htmlFor='sectionName' className='block text-sm font-medium text-gray-200 mb-2'>Section Name <sup className='text-red-500'>*</sup></label>
          <div className='flex gap-3 items-center'>
            <input
              id='sectionName'
              placeholder='Add section name'
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className='flex-1 px-4 py-2 rounded-md bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400'
            />
            <IconButton
              type="button"
              onClick={handleCreateSection}
              text={"Create"}
              outline={false}
              customClasses={"flex items-center gap-2"}
            >
              <FaCirclePlus className='text-black' size={18} />
            </IconButton>
          </div>
        </div>
      </form>

      <div className='mt-6'>
        {Array.isArray(localCourse.courseContent) && localCourse.courseContent.length > 0 && (
          <NestedView
            sections={localCourse.courseContent}
            onAddLecture={handleAddLecture}
            onDeleteLecture={handleDeleteLecture}
            onDeleteSection={handleDeleteSection}
            openSectionId={openSectionId}
            highlightLectureId={highlightLectureId}
          />
        )}
      </div>

      <div className='flex justify-end gap-x-3 mt-6'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center px-4 py-2 bg-gray-700 text-white hover:bg-gray-600'
          type='button'
        >
          Back
        </button>
        <IconButton
          text="Next"
          onClick={goToNext}
          outline={false}
          disabled={!canProceed}
          title={!canProceed ? "Add at least one section and a lecture in every section" : "Next"}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <FaCircleArrowRight />}
        </IconButton>
      </div>
    </div>
  )
}
