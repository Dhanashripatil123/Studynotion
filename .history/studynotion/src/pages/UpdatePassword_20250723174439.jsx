
import {useState} from 'react'
import {useSelector} from 'react-redux';


export const UpdatePassword = () => {
    
        const [showPassword,setShowPassword] = useState(false);
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