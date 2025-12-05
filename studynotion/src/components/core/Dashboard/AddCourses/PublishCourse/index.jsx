import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { setStep } from '../../../../../slices/courseSlice';

const PublishCourse = () => {
    const {register,handleSubmit,setValue,getValues} = useForm();
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
      if(course?.status === COURSE_STATUS.DRAFT){
        setValue("public",true)
      }
    },[setValue, course]);

    const onsumbit = () => {
        handlecoursePublish(); 
    }

    const handlecoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true){
            // Handle publish logic here
        }
    }
        
    const goback = () => {
        dispatch(setStep(2));
    }
    
                                                  
    return (
      <div>
        <h2 className="text-4xl font-bold text-white mb-8">Publish Course</h2>
        <div className='rounded-lg bg-gray-800 border border-gray-700 p-8'>
          <form onSubmit={handleSubmit(onsumbit)}>
            <div className="space-y-8">
              <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-6">
                <input 
                  type='checkbox' 
                  id='public'
                  {...register("public")}
                  className='rounded h-5 w-5 cursor-pointer accent-yellow-500'
                ></input>
                <label htmlFor='public' className='text-lg font-semibold text-white cursor-pointer'>
                  Make this course public
                </label>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type='button'
                  onClick={goback}
                  className="rounded-lg px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors"
                >
                  ← Go Back
                </button>
                <IconButton text="Save & Publish"></IconButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default PublishCourse