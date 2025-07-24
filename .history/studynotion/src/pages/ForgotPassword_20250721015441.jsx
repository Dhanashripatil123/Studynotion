import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {usedis}

const ForgotPassword = () => {
     
       const [emailSent,setEmailSent]   = useState(false)  
        const [email,setEmail] = useState("");
         const {loading} = useSelector((state)=>state.auth);
         const dispatch = useDispatch()
         
         const handleOnSubmit = (e)=>{
              e.preventDefault();
              dispatch(getPasswordResetToken);
         }

    return (
        <div className='flex justify-center text-2xl text-white '>
           {
             loading ? (
                  <div>Loading ...</div>                                 
             ):(
                 <div>
                   <h1>
                      {
                         !emailSent ?  "Reset your Password" : "Check Your Email"                        
                      }                            
                  </h1>  

                  <p>
                    {
                         !emailSent ? "Have no fear . we will email you innstruction to reset your Password. If you dont have access to your emai we can try account recovery" : `we have sent reset email to ${email}`                         
                    }                              
                  </p>

                  <form>
                      {
                        !emailSent && (
                            <label>
                                 <p>Email Address :</p>
                                 <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder='Enter your email address'
                                 />
                            </label>                    
                        )                      
                      }  

                      <button type="submit" className=''>
                        {
                          !emailSent ? "Reset Password" : "Resend Email"                         
                        }                          
                     </button>                          
                 </form>

                 <div>
                   <Link to="/login">
                      <p> Back to Login</p>
                   </Link>                               
                  </div>                             
                 </div>                                 
             )
           }                                     
        </div>                                          
    )                                              
}

export default ForgotPassword