import {React} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import HighlightText from '../components/core/Homepage/HighlightText';
import CTButton from '../components/core/Homepage/Button';

const Home = () => {
return(
   <div>
      {/*Section 1*/}

      <div className='relative mx-auto flex flex-col w-11/12  item-center text-white justify-between'>
             <Link to={"/signup"}>
                 <div className='group mt-16 p-1 mx-auto rounded-full bg-[#0e1829] font-bold text-black-200 transition-all-duration-200 hover:scale-95 w-fit'>
                     <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-black'>                            
                    <p>Become a Instructor</p>  
                    <FaArrowRight/>     
                    </div>                        
                 </div>
             </Link> 

             <div className='text-center text-4xl font-semibold mt-8 text-white'>
               EMPOWER YOUR FUTURE WITH 
                <HighlightText text={"Coding Skills"} ></HighlightText>                                    */}
            </div> 

            <div className='text-center w-[90%] text-lg font-bold text-richblack-300'>
                 with our online coding courses , you can lern at your own pace ,from anywhere in the word , and get access to a wealth of sources , including hands-on project , quizzess and personalized feedback from Instructors                                  
            </div>  

            <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/singup"}>Learn More</CTAButton>
            <CTAButton active={true} linkto={"/singup"}>Book a demo</CTAButton>
            </div> 

             </div>

      {/*Section 2*/} 
      {/*Section 3*/} 
      {/*Section 1*/} 
   </div>                                               
)


}

export default Home