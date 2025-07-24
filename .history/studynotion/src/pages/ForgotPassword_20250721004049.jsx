import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
     
       const [emailSent,setEmailSent]   = useState(false)  
        const [email,setEmail] = useState("");
         const {loading} = useSelector((state)=>{state.auth) 

    return (
        <div className='flex justify-center items-center text-3xl '>
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

                      <button>
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