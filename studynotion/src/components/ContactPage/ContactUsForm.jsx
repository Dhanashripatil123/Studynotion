import React , { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import {apiConnector} from "../../services/apiconnector"
import { contactEndpoints } from "../../services/apis"
import contrycode from "../../data/contrycode";

const ContactUsForm = ()=>{

     const [loading , setLoading] = useState(false);
     const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}                                          
     } = useForm();

     const SubmitContactForm = async(data)=>{
            console.log("Logging Data",data);
            try{
               setLoading(true);
            //    const response = await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
              const response = {status:"OK"}
               console.log("Logging response",response);
               setLoading(false);
            }
            catch(error){
                console.log("Error",error.message);
                setLoading(false)
                
            }
     }

     useEffect( ()=>{
         if(isSubmitSuccessful){
               reset({
                   email:"",
                   firstname:"",
                   lastname:" ",
                   phoneNo:" "
               })
         }                                         
     },[reset,isSubmitSuccessful])

     return (
       <form onSubmit={handleSubmit(SubmitContactForm)}>
        
          <div className='flex gap-5 flex-col'>
            {/* firstName */}
                 <div className='flex flex-col'>
                <label htmlFor="firstname">
                    First Name
                </label>
                <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter the first name'
                className='bg-white text-black'
                {...register("firstname",{required:true})}

                ></input>
                {
                    errors.firstname &&(
                       <span>
                        please enter your name
                       </span>
                    )
                }
                
            </div>

        {/* last Name */}
                 <div className='flex flex-col'>
                     <label htmlFor="lastname">
                         Last Name
                     </label>
                     <input
                         type='text'
                         name='lastname'
                         id='lastname'
                         placeholder='Enter the last name'
                         className='bg-white text-black'
                         {...register("firstname", { required: true })}

                     ></input>
                     {
                         errors.firstname && (
                             <span>
                                 please enter your name
                             </span>
                         )
                     }

                 </div>

                 {/* email */}
                 <div className='flex flex-col'>
                     <label htmlFor='email'> Email Adress </label>
                        <input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='Enter rmail adress'
                         className='bg-white text-black'
                          {...register("email",{required:true})}
                        >
                        </input>
                        {
                            errors.email && (
                                <span>
                                    please enter your email adress
                                </span>
                            )
                        }
                   
                 </div>

                 {/* phooneNo */}
                 <div className='flex flex-col gap-x-10'>
                     <label htmlFor='Phonenumber'>
                        Phone Number
                    </label>

                    <div className='flex flex-row gap-1 m-7'>
                        {/* dropdown */}
                        <div className='flex flex-col gap-2 w-[80px]'>
                            <select 
                              name='dropdown'
                              id="dropdown"
                              className='bg-yellow-500'
                              {...register("countrycode",{required:true})}
                            >
                                {
                                     contrycode.map((element,index)=>{
                                          return(
                                            <option key={index} value={element.code}>
                                                  {element.code}-{element.country}
                                            </option>
                                          )
                                     })
                                }
                            </select>
                            </div> 

                            {/* <div className='w-[25px] bg-yellow-300'>

                            </div> */}

                        <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                            <input 
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-black bg-white'
                            
                            {...register("phoneNo",
                            {
                            required:{value:true,message:"Please Enter Phone Number"},
                            maxLength:{value:10,message:"Invalid Phone Number"},
                            minLength:{value:8,message:"Invalid Phone Number"}})}
                            >
                            </input>
                        </div>
                    </div>
                    {
                        errors.phoneNo && (
                            <span>
                                {errors.phoneNo.message}
                            </span>
                        )
                    }

                 </div>

                 {/* message */}
                 <div className='flex flex-col gap-3'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                       name='message'
                       id='message'
                       cols="30"
                       rows="7"
                       placeholder='Enetr your message here'
                        className='bg-white text-black'
                       {...register("message",{required:true})}
                    >

                    </textarea>
                    {
                        errors.message && (
                            <span>
                                yes, ffvgersdfg
                            </span>
                        )
                    }
                 </div>

                 <button  type='submit' className='rounded-md bg-yellow-500 text-center gap-5'>
                      send message
                 </button>
          </div>
       </form>                                         
     )                                             
}

export default ContactUsForm