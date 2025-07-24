
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";


export const UpdatePassword = () => {
    
    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
        const [showPassword,setShowPassword] = useState(false);
        const [showConfirmPassword,setShowConfirmPassword] = useState(false);
        const {loading} = useSelector((state)=>state.auth); 
        const {password,confirmPassword} = formData;
        
        const handleOnChange = (e) => {
            setFormData((prevData) => (
                {
                    ...prevData,
                    [e.target.name] : e.target.value
                }
            ))
        }

        const handleOnSubmit = (e)=>{
            e.preventDefault();
            const token = location.pathname.split('/').at(-1)
            dispatch(resetPassword(password,confirmPassword,token));
        }
       

   return(
       <div>
        <h1>Choose new password</h1>
        <p>Almost done. Enter your new password and your all set</p>
        <form onSubmit={handleOnSubmit}>
           <label>
               <p>Password*</p>
               <input
                   required
                   type={showPassword ? "text" : "password"}
                   name="password"
                   value={password}
                   onChange={handleOnChange}
                   placeholder='Password'
               />
               <span onClick={() => setShowPassword((prev) => !prev)}>
                   {
                       showPassword
                               ? < FaEyeSlash fontSize={24} />
                            : <FaEye fontSize={24} />
                   }
               </span>
           </label>

           <label>
               <p>Confirm New Password*</p>
               <input
                   required
                   type={showPassword ? "text" : "password"}
                   name="confirmpassword"
                   value={confirmPassword}
                   onChange={handleOnChange}
                   placeholder='Confirm Password'
               />
               <span onClick={() => setShowPassword((prev) => !prev)}>
                   {
                       showPassword
                               ? < FaEyeSlash fontSize={24} />
                            : <EyeSlash fontSize={24} />
                   }
               </span>
           </label>

           <button type='submit'>
            Reset Button
           </button>
           </form>
           <div>
            <Link to='/login'>
              <p>
                back to login
              </p>
            </Link>
           </div>
                                         
       </div>                                           
   )
}