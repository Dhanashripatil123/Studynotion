import React from 'react'

export const UpdatePassword = () => {
        const {loading} = useSelector(())                                          
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