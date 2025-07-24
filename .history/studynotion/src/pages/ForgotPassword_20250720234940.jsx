import React from 'react'
import {useSelector} from 'react-redux'

const ForgotPassword = () => {
     
      const {loading} = useSelector((state)=>{state.auth})                                            
    return (
        <div className='flex justify-center items-center text-3xl '>
           {
             loading ? (
                  <div>Loading ...</div>                                 
             ):(
                                                  
             )
           }                                     
        </div>                                          
    )                                              
}

export default ForgotPassword