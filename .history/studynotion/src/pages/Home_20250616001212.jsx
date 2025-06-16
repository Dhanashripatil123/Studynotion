import {React} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import HighlightText from '../components/core/Homepage/HighlightText';

const Home = () => {
return(
   <div>
      {/*Section 1*/}

      <div className='relative mx-auto flex flex-col w-11/12  item-center text-white justify-between'>
             <Link to={"/signup"}>
                 <div className='group mt-16 p-1 mx-auto rounded-full bg-[#161D29] font-bold text-black-200 transition-all-duration-200 hover:scale-95 w-fit'>
                     <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-black'>                            
                    <p>Become a Instructor</p>  
                    <FaArrowRight/>     
                    </div>                        
                 </div>
             </Link> 

             <div className='text-center text-4xl font-semibold mt-8'>
               //EMPOWER YOUR FUTURE WITH 
               <HighlightText text={"Coding "} ></HighlightText>                                   
            </div> 

             </div>

      {/*Section 2*/} 
      {/*Section 3*/} 
      {/*Section 1*/} 
   </div>                                               
)


}

export default Home