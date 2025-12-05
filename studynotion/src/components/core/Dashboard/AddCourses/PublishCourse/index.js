import React from 'react'
import { useForm } from 'react-hook-form';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';

const PublishCourse = () => {

    const {register,handleSubmit,setValue,getValues} = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)

    const onsumbit = () => {

    }
                                                  
    return (
      <div className='rounded-md border-[1px] bg-gray-800 border-gray-700'>
          <p>Published Courses</p> 
          <form onSubmit={handleSubmit(onsumbit)}>
            <div>
              <label htmlFor='public'>make this course as public</label>
                <input 
                type='checkbox' 
                id='public'
                {...register("public")}
                className='rounded h-4 w-4'
                >
                </input>
              
            </div>
            </form>                                          
      </div>
    )
}

export default PublishCourse