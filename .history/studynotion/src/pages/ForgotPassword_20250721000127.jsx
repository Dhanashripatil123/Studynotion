import React,{useState} from 'react'
import {useSelector} from 'react-redux'

const ForgotPassword = () => {
     
       const [emailSent,setEmailSent]   = useState(false)  
        const [email,setEmail] = useState("");
         const {loading} = useSelector((state)=>{state.auth}) 

    return (
        <div className='flex justify-center items-center text-3xl '>
           {
             loading ? (
                  <div>Loading ...</div>                                 
             ):(
                 <div>
                   <h1>
                                                  
                  </h1>                               
                 </div>                                 
             )
           }                                     
        </div>                                          
    )                                              
}

export default ForgotPassword