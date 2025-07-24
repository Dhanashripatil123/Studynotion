import React from 'react'
import { useFormState } from 'react-dom';
const {useSelector} from 'raect-dom'
export const UpdatePassword = () => {
        const {loading} = useSelector((state)=>state.auth);                                          
   return(
       <div>
           <label>
               <p>Confirm New Password*</p>
               <input
                   required
                   type={showPassword ? "text" : "password"}
                   name="password"
                   value={password}
                   onChange={handleOnChange}
               />
               <span onClick={() => setShowPassword((prev) => !prev)}>
                   {
                       showPassword
                           ? <AiFillEyeInvisible fontSize={24} />
                           : <AiFillEye fontSize={24} />
                   }
               </span>
           </label>
                                         
       </div>                                           
   )
}