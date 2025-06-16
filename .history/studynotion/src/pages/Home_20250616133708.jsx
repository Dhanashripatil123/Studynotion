import {React} from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks';

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

            <div className=' flex flex-row gap-7 pl-9 mt-8'>
            <CTAButton active={true} linkto={"/singup"}>Learn More</CTAButton>
            <CTAButton active={false} linkto={"/login"}>Book a demo</CTAButton>
            </div> 

            <div className='mx-3 my-12 shadow-blue-200'>
              <video
                muted
                loop
                autoPlay 
              >
                <source src={Banner} type='video/mp4'></source>
              </video>
              </div>

                  {/* {code section 2}                           */}
                  <div>
                <CodeBlocks  position={"lg:flex-row"}
                heading={
                  <div className='text-4xl font-semibold'>
                    unlock your
                    <HighlightText text={"coding potential"}>with our online courses</HighlightText>
                  </div>
                }
                subheading = {
                  "Our courses are designed and taught by industry experts who have year of experince"
                }
                ctabtn1={
                  {
                     btnText: "try it yourself",
                     linkto: "/signup", 
                     active:true
                  }
                }
              ctabtn2={
                {
                  btnText:"lernmore",
                  linkto: "/login",
                  active: false
                }
              }

              codeblock={
                `<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>/n<h1><a href="/">Header</a></h1><nav>
<a href="one/">One</a>\n<a href="two/">Two</a><a href="three/">Three</a></nav></body>\n</html>`}
codeColor={"text-yellow-25"}
                ></CodeBlocks>

                
              </div>

              {/* {code section 3} */}
              <div>
              <CodeBlocks  position={"lg:flex-row-reverse"}
                heading={
                  <div className='text-4xl font-semibold'>
                    unlock your
                    <HighlightText text={"coding potential"}>with our online courses</HighlightText>
                  </div>
                }
                subheading = {
                  "Our courses are designed and taught by industry experts who have year of experince"
                }
                ctabtn1={
                  {
                     btnText: "try it yourself",
                     linkto: "/signup", 
                     active:true
                  }
                }
              ctabtn2={
                {
                  btnText:"lernmore",
                  linkto: "/login",
                  active: false
                }
              }

              // backgroundGradient={
                
              //   }

              codeblock={
                `<<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>/n<h1><a href="/">Header</a></h1><nav>
<a href="one/">One</a>\n<a href="two/">Two</a><a href="three/">Three</a></nav></body>\n</html>`}
codeColor={"text-yellow-25"}
                ></CodeBlocks>                                   
              </div>


          {/* {code section 2}                           */}
      <div className='bg-[#adb6c6] text-black'>
        <div className='homepage_bg h-[333px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col justify-center item-center gap-5 mx-auto'>
          <div className=' flex flex-row gap-7 text-white'>
          <CTAButton active={true} linkto={"/signup"}>
            <div className='flex gap-8'>
              Explore Full Catalog
              <FaArrowRight />
            </div>
            </CTAButton>

            <CTAButton acive={false} linkto={"/signup"}>
               <div>
                  Learn more
               </div>
            </CTAButton>
            
             </div>
            </div>
            </div>
            </div>                                                                                                                                           

</div> 

             </div>
                                              
)


}

export default Home