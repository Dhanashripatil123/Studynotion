import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconButton from '../../../../common/IconButton'
import { FaCirclePlus } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { FaCircleArrowRight } from "react-icons/fa6"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast'
import { createSection, updatedSection } from '../../../../../services/operations/courseDetailsAPI'
import NestedView from './NestedView'

export default function CourseBuilderForm() {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editSectionName, setEditSectionName] = useState(null)
  const { course } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      // we are editing the section name
      result = await updatedSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }

    // update values
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    // loading false
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }

    if (course.courseContent.some((section) => section.subsection.length === 0)) {
      toast.error("Please add at least one lecture in each section")
      return
    }
    // if everything is good
    dispatch(setStep(3))
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  return (
    <div className='text-white'>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
          <input
            id='sectionName'
            placeholder='Add section Name'
            {...register("sectionName", { required: true })}
            className='w-full'
          />
          {errors.sectionName && (
            <span>Section name is required</span>
          )}

          <div className='mt-10'>
            <IconButton
              type="submit"
              text={editSectionName ? "Edit section Name" : "Create Section"}
              outline={true}
              customClasses={"text-white"}
            >
              <FaCirclePlus className='text-yellow-500' size={20} />
            </IconButton>

            {/* {course.courseContent.length > 0 && (
              <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )} */}

            <NestedView></NestedView>

            {editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-gray-500 underline mt-10'
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </form>

      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'
        >
          Back
        </button>
        <IconButton text="Next" onClick={goToNext}>
          <FaCircleArrowRight />
        </IconButton>
      </div>
    </div>
  )
}
