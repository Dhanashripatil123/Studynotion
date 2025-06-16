import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.webp"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.webp"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.webp"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.webp"
import TimelineImage from "../../../assets/Images/TimelineImage.webp"
//import CTAButton from "../components/core/Homepage/Button";



const TimelineSection = () => {
    let timeline = [
        {
            Logo: Logo1,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            Logo: Logo2,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            Logo: Logo3,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
        {
            Logo: Logo4,
            heading: "Leadership",
            description: "Fully committed to the success company"
        },
    ]
    
    return(
       <div>
           <div className=' flex flex-col md:flex-row gap-6 items-center '>

             <div className='w-11/12  md:w-[45%] flex flex-col gap-5'>
               {
                   timeline.map((element,index)=>{
                       return (
                            <div className=' ml-6 flex flex-row gap-6' key={index}>
                               <div className='w-[50px] h-[50px] bg-white flex item-center shadow-md '>
                                     <img src={element.Logo}></img>
                              </div>   
                              <div>
                                  <h2 className='font-semibold text-[18px]'>{element.heading}</h2> 
                                  <p className='text-base'>{element.description}</p>               
                              </div>                
                            </div>                      
                       )
                   })                               
               }                                   
              </div>                                     
             <div className='relative shadow-blue-200'>
                <img src={TimelineImage} alt='TimelineImage' className='shadow-white object-cover h-fit left-[-50%] mr-20'></img>

                <div className='absolute bg-green-700 flex flex-row text-white uppercase'>
                    <div className='flex flex-row gap-5 items-center border-r border-green-700 px-7'>
                      <p className='text-3xl font-bold '>10</p> 
                      <p className='text-green-300'>Year of Experience</p>                           
                   </div> 

                   <div className='flex gap-5 items-center px-7'>
                   <p className='text-3xl font-bold '>250</p> 
                   <p className='text-green-300'>Type of Courses</p>                                   
                   </div>                             
               </div>                                  
            </div>                                   
           </div>                                       
       </div>                                           
    )                                              
}

export default TimelineSection