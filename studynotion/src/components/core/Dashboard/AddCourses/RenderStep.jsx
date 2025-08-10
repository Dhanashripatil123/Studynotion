import { FaCheck } from "react-icons/fa"
import { IoTimeSharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import CourseInformation from "./CourseInfrormation/CourseInformation";


export default function RenderStep() {

     const {step} = useSelector((state)=>state.course)                                              

    const steps = [
        {
          id:1,
          title:"Course Information",                                        
        },                                          
        {
          id:2,
          title:"Course Builder",                                        
        },                                          
        {
          id:3,
          title:"publish",                                        
        }                                          
    ]

     return(
       <div>
            {
                steps.map((item)=>{
                  <>                               
                  <div className={`${step=== item.id ? "bg-yellow-900 border-yellow-500 text-yellow-500" 
                                                  :"border-gray-600 bg-black text-gray-300"}`}>
                                                  {
                                                     step > item.id ? (<FaCheck></FaCheck>):(item.id)                                              
                                                  }
                  </div>  
                  {/* Add Code for dashes the abels */}
                  {
                      item.id !== step.length                           
                  }                            
                   </>                                 
                })                                  
            }
            <div>
                {steps.map((item)=>{
                    <>
                    <div>
                        <p>{item.title}</p>                          
                    </div>
                    </>                              
                })}                                  
            </div>
            {step === 1 && <CourseInformation/>}
            {/* {steps === 2 && <CourseBuilderForm></CourseBuilderForm>}
            {steps === 3 && <PublishCourse></PublishCourse>} */}
       </div> 
                                                 
     )

}