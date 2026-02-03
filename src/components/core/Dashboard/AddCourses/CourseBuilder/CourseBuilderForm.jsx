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
// Note: createSubSection is exported as an alias in the operations API file.
// This file does not call it directly here, so we avoid importing an unused symbol.
import { createSection, fetchFullCourseDetailsById, createSubSection, updatedSection, deleteSection } from '../../../../../services/operations/courseDetailsAPI'
import SubSectionModal from './SubSectionModal'
import { setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, setCompletedLectures } from '../../../../../slices/viewCoursesSlice'

export default function CourseBuilderForm() {

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth || {})
  const dispatch = useDispatch()

  // Local state to maintain sections and lectures per user's request
  const [localCourse, setLocalCourse] = useState(() => ({ courseContent: [] }))
  const [sectionName, setSectionName] = useState("")
  const [openSectionId, setOpenSectionId] = useState(null)
  const [highlightLectureId, setHighlightLectureId] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
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

  const handleCreateSection = async (e) => {
    e && e.preventDefault && e.preventDefault()
    const name = sectionName.trim()
    if (!name) {
      toast.error('Section name is required')
      return
    }

    // If we don't have a server-side course id, fallback to local behavior
    if (!course?._id) {
      const newSection = {
        _id: generateId(),
        sectionName: name,
        subSection: [],
      }
      const next = { courseContent: [...(localCourse.courseContent||[]), newSection] }
      setLocalCourse(next)
      dispatch(setCourse({ ...(course || {}), ...next }))
      setSectionName("")
      setOpenSectionId(newSection._id)
      return
    }

    setLoading(true)
    try {
      // Call server to create section (persist)
      const payload = { sectionName: name, courseId: course._id }
      const result = await createSection(payload, token)


      // After creating a section, fetch the authoritative full course details
      let latestCourse = null
      try {
        const fullResp = await fetchFullCourseDetailsById(course._id, token)
        latestCourse = fullResp?.data || fullResp || null
        console.log('[CourseBuilder] fetched full course after createSection:', latestCourse)
      } catch (e) {
        console.warn('[CourseBuilder] failed to fetch full course after createSection, falling back to createSection response', e)
        latestCourse = result?.updatedCourseDetails || result?.data || result || null
      }

      const coursePayload = latestCourse
      const sectionData = coursePayload?.courseContent || coursePayload?.courseSectionData || coursePayload?.sections || []

      // update local & global state from server response
      setLocalCourse({ courseContent: sectionData })
      dispatch(setCourse({ ...(course || {}), ...(coursePayload || {}), courseContent: sectionData }))

      // update the ViewCourse slice so sidebar renders persisted sections immediately
      dispatch(setCourseSectionData(sectionData))
      dispatch(setEntireCourseData(coursePayload || {}))
      dispatch(setTotalNoOfLectures(coursePayload?.totalNoOfLectures || sectionData.reduce((acc, s) => acc + ((s.lectures || s.subSection || []).length), 0)))
      dispatch(setCompletedLectures(coursePayload?.completedLectures || coursePayload?.completedvideos || []))

      // open the newly created section (last one)
      const createdSectionId = sectionData?.[sectionData.length - 1]?._id || generateId()
      setOpenSectionId(createdSectionId)
      setSectionName("")
    } catch (err) {
      console.error('Failed to create section on server, falling back to local:', err)
      toast.error('Failed to create section on server — saved locally')
      // fallback to local-only create
      const newSection = {
        _id: generateId(),
        sectionName: name,
        subSection: [],
      }
      const next = { courseContent: [...(localCourse.courseContent||[]), newSection] }
      setLocalCourse(next)
      dispatch(setCourse({ ...(course || {}), ...next }))
      setOpenSectionId(newSection._id)
      setSectionName("")
    } finally {
      setLoading(false)
    }
  }

  const handleAddLecture = (sectionId, lecture) => {
    // If we have a server-side course and auth token, try to persist the lecture
    const performServerCreate = async () => {
      if (!token) throw new Error('Missing auth token')
      const fd = new FormData()
      fd.append('sectionId', sectionId)
      fd.append('title', lecture.title || '')
      fd.append('description', lecture.description || '')
      if (lecture.videoFile && lecture.videoFile instanceof File) fd.append('video', lecture.videoFile)
      else if (lecture.videoUrl) fd.append('video', lecture.videoUrl)

      // Debug: log token presence and FormData entries so we can verify payload
      try {
        console.log('[CourseBuilder] Creating subsection - token present:', !!token, 'sectionId:', sectionId)
        for (const entry of fd.entries()) {
          // entry[1] may be a File — log type/name for clarity
          const value = entry[1]
          if (value instanceof File) console.log('[CourseBuilder] FormData entry:', entry[0], 'File:', value.name, value.type, `${(value.size/1024/1024).toFixed(2)}MB`)
          else console.log('[CourseBuilder] FormData entry:', entry[0], value)
        }
      } catch (logErr) {
        console.warn('Failed to enumerate FormData for debugging', logErr)
      }

      try {
        const resp = await createSubSection(fd, token)
        console.log('[CourseBuilder] createSubSection() returned:', resp)
        try { window.__LAST_CREATE_SUBSECTION_FROM_CALL__ = resp; window.LAST_CREATE_SUBSECTION_FROM_CALL = resp } catch (e) {}
        // createSubSection returns the created/updated data on success, or null on failure
        if (!resp) throw new Error('createSubSection returned no data')
        return resp
      } catch (callErr) {
        console.error('[CourseBuilder] createSubSection() threw:', callErr)
        try { window.__LAST_CREATE_SUBSECTION_ERROR_FROM_CALL__ = callErr; window.LAST_CREATE_SUBSECTION_ERROR_FROM_CALL = callErr } catch (e) {}
        throw callErr
      }
    }

    if (course?._id) {
      // attempt server persist, fallback to local update on failure
      performServerCreate().then(async (resp) => {
        try {
          const full = await fetchFullCourseDetailsById(course._id, token)
          const payload = full?.data || full || resp?.data || resp || null
          const sectionData = payload?.courseContent || payload?.courseSectionData || payload?.sections || []
          setLocalCourse({ courseContent: sectionData })
          dispatch(setCourse({ ...(course || {}), ...(payload || {}), courseContent: sectionData }))
          dispatch(setCourseSectionData(sectionData))
          dispatch(setEntireCourseData(payload || {}))
          // Notify user of success using server message when available
          toast.success(resp?.message || 'Lecture added successfully')
        } catch (e) {
          console.warn('Failed to refresh course after creating subsection', e)
        }
      }).catch((err) => {
        console.error('createSubSection failed, falling back to local add:', err)
        // Show server-provided error message when available
        const serverMsg = err?.response?.data?.message || err?.message || 'Failed to add lecture'
        toast.error(serverMsg)
        // fallback to local add
        const sanitized = { ...lecture, _id: generateId() }
        if (sanitized.videoFile && sanitized.videoFile instanceof File) {
          try { sanitized.videoUrl = URL.createObjectURL(sanitized.videoFile) } catch (e) { sanitized.videoUrl = '' }
          sanitized.videoName = sanitized.videoFile.name
          sanitized.videoSize = sanitized.videoFile.size
          delete sanitized.videoFile
        }
        const nextContent = (localCourse.courseContent||[]).map((s) => s._id === sectionId ? { ...s, subSection: [...(s.subSection||[]), sanitized] } : s)
        const next = { courseContent: nextContent }
        setLocalCourse(next)
        dispatch(setCourse({ ...(course || {}), ...next }))
      })
      return
    }

    // No server course id — do local only
    const sanitized = { ...lecture, _id: generateId() }
    if (sanitized.videoFile && sanitized.videoFile instanceof File) {
      try { sanitized.videoUrl = URL.createObjectURL(sanitized.videoFile) } catch (e) { sanitized.videoUrl = '' }
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
    // If course exists on server, call deleteSection API and refresh; otherwise remove locally
    if (course?._id && token) {
      (async () => {
        try {
          await deleteSection({ sectionId, courseId: course._id }, token)
          const full = await fetchFullCourseDetailsById(course._id, token)
          const payload = full?.data || full || null
          const sectionData = payload?.courseContent || payload?.courseSectionData || payload?.sections || []
          setLocalCourse({ courseContent: sectionData })
          dispatch(setCourse({ ...(course || {}), ...(payload || {}), courseContent: sectionData }))
          dispatch(setCourseSectionData(sectionData))
          dispatch(setEntireCourseData(payload || {}))
        } catch (err) {
          console.error('deleteSection failed, falling back to local delete', err)
          const nextContent = (localCourse.courseContent||[]).filter(s => s._id !== sectionId)
          const next = { courseContent: nextContent }
          setLocalCourse(next)
          dispatch(setCourse({ ...(course || {}), ...next }))
        }
      })()
      return
    }

    const nextContent = (localCourse.courseContent||[]).filter(s => s._id !== sectionId)
    const next = { courseContent: nextContent }
    setLocalCourse(next)
    dispatch(setCourse({ ...(course || {}), ...next }))
  }

  const handleUpdateSection = async (sectionId, newName) => {
    if (!newName) return
    if (course?._id && token) {
      try {
        await updatedSection({ sectionId, sectionName: newName, courseId: course._id }, token)
          const full = await fetchFullCourseDetailsById(course._id, token)
          const payload = full?.data || full || null
          const sectionData = payload?.courseContent || payload?.courseSectionData || payload?.sections || []
          setLocalCourse({ courseContent: sectionData })
          dispatch(setCourse({ ...(course || {}), ...(payload || {}), courseContent: sectionData }))
          dispatch(setCourseSectionData(sectionData))
          dispatch(setEntireCourseData(payload || {}))
      } catch (err) {
        console.error('update section failed', err)
      }
      return
    }
    // local-only update
    const nextContent = (localCourse.courseContent||[]).map(s => s._id === sectionId ? { ...s, sectionName: newName } : s)
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
            onUpdateSection={handleUpdateSection}
            editSubSection={editSubSection}
            setEditSubSection={setEditSubSection}
            openSectionId={openSectionId}
            highlightLectureId={highlightLectureId}
          />
        )}
      </div>

      {/* render edit modal for subsection if requested */}
      {editSubSection && (
        <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
      )}

      <div className='flex justify-end gap-x-3 mt-6'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center px-4 py-2 bg-gray-700 text-white hover:bg-gray-600'
          type='button'
        >
          Back
        </button>
        <button
          onClick={goToNext}
          disabled={!canProceed}
          title={!canProceed ? "Add at least one section and a lecture in every section" : "Next"}
          className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-yellow-500/25 flex items-center gap-2"
        >
          Next
          {loading ? <FaSpinner className="animate-spin" /> : <FaCircleArrowRight />}
        </button>
      </div>
    </div>
  )
}
