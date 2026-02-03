import React, { useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLangugeSection from '../components/core/Homepage/LearningLangugeSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import FooterLinks from '../components/FooterLink2';
import ReviewSlider from '../components/common/ReviewSlider';
import { HomePageExplore } from '../data/homepage-explore';

const Home = () => {
  const [currentTag, setCurrentTag] = useState(HomePageExplore[0]?.tag || "Free");

  const ExploreByTag = () => {
    const currentData = HomePageExplore.find(item => item.tag === currentTag);

    return (
      <div className='mt-8'>
        {/* Tag Buttons */}
        <div className='flex flex-row rounded-full  bg-[#3f4757] mb-5 border-[#AFB2BF] px-1 py-1 "'>
          {HomePageExplore.map((item) => (
            <button
              key={item.tag}
              onClick={() => setCurrentTag(item.tag)}
              className={`${
                currentTag === item.tag
                  ? "bg-[#000814] text-white font-bold" : "text-[#999DAA]"} rounded-full trandition-smooth transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 
              }`}
            >
              {item.tag}
            </button>
          ))}
        </div>

        {/* Active tag label + Course Cards */}
        
        <div className='text-center text-sm text-richblack-300 mb-6'>Courses: {currentData?.courses?.length ?? 0}</div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentData?.courses?.map((course, index) => (
            <div
              key={index}
              className='bg-richblack-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-400/50 hover:border-yellow-300 transform hover:-translate-y-2 relative overflow-hidden group'
            >
              {/* Gradient overlay on hover */}
              <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
              
              {/* Course Image Placeholder with enhanced styling */}
              <div className='w-full h-36 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden'>
                <div className='absolute inset-0 bg-black/20'></div>
                <span className='text-black font-bold text-2xl relative z-10 drop-shadow-lg'>{course.heading.charAt(0)}</span>
                {/* Floating badge */}
                <div className='absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-full font-medium'>
                  {course.level || "Beginner"}
                </div>
              </div>
              
              <div className='relative z-10'>
                <h3 className='text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-200'>{course.heading}</h3>
                <p className='text-richblack-300 mb-4 text-sm line-clamp-3 leading-relaxed'>{course.description}</p>
                
                <div className='flex justify-between items-center text-sm text-richblack-400 mb-4'>
                  <div className='flex items-center gap-1'>
                    <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                    </svg>
                    <span>Level: {course.level || "N/A"}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'/>
                    </svg>
                    <span>Lessons: {course.lessonNumber || "N/A"}</span>
                  </div>
                </div>
                
                {/* Enhanced Price and Cart Button */}
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <span className='text-yellow-400 font-bold text-xl'>
                      ${course.price || "Free"}
                    </span>
                    {course.price && <span className='text-richblack-400 text-xs line-through'>$99</span>}
                  </div>
                  <button className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-5 py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group/btn'>
                    <div className='absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200'></div>
                    <svg className='w-5 h-5 relative z-10' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/>
                    </svg>
                    <span className='relative z-10'>Add to Cart</span>
                  </button>
                </div>
              </div>
              
              {/* Subtle bottom accent */}
              <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
            </div>
          )) || <p className='text-center text-richblack-400'>No courses available for this tag.</p>}
        </div>
      </div>
    );
  };

  return (
    
    <div>
     
      {/*Section 1*/}

      <div className='relative mx-auto flex flex-col w-11/12  item-center text-white justify-between'>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full bg-[#0e1829] font-bold text-black-200 transition-all-duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-black'>
              <p>Become a Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-8 text-white'>
          EMPOWER YOUR FUTURE WITH
          <HighlightText text={"Coding Skills"} ></HighlightText>
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

        {/* code section 2 */}
        <div>
          <CodeBlocks position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                unlock your
                <HighlightText text={"coding potential"}>with our online courses</HighlightText>
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have year of experince"
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "lernmore",
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
          <CodeBlocks position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                unlock your
                <HighlightText text={"coding potential"}>with our online courses</HighlightText>
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have year of experince"
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "lernmore",
                linkto: "/login",
                active: false
              }
            }

           
            codeblock={
              `<<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><link rel="stylesheet" href="styles.css">\n</head>\n<body>/n<h1><a href="/">Header</a></h1><nav>
<a href="one/">One</a>\n<a href="two/">Two</a><a href="three/">Three</a></nav></body>\n</html>`}
            codeColor={"text-yellow-25"}
          ></CodeBlocks>

          
            <ExploreByTag />

        </div>

        <br></br>


        {/* {section 2}                           */}
        <div className='bg-[#dadce0] text-black'>
          <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 '>
              <div className=' flex flex-row gap-7 text-white mt-9'>
                <CTAButton active={true} linkto={"/signup"}>
                  <div className='flex items-center gap-8 '>
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


          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
            <div className='flex flex-row gap-7 '>
              <div className='text-4xl font-semibold w-[45%]'>
                Get the skill you need for
                <HighlightText text={"job that is in demand"}></HighlightText>
              </div>


              <div className='flex flex-col gap-10 w-[50%] items-start mr-12'>
                <div className='text-[16px] '>
                  The modern Studynotion is the dictates its own term. today, to be a competitive specialist require more than professional skills.
                </div>

                <div className='mb-7'>
                  <CTAButton active={true} linkto={"/signup"}>
                    <div >
                      Learn More
                    </div>
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>

          <TimelineSection></TimelineSection>
          <LearningLangugeSection></LearningLangugeSection>


        </div>
      </div>

      {/* {section 3}                                                                                                                                    */}

      <div>
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-[#0e1829] text-white'>

          <InstructorSection></InstructorSection>

          {/* Explore by Tag (uses src/data/homepage-explore.js) */}
          <div className='w-11/12 mx-auto max-w-maxContent my-12 text-white'>
            <div className='text-center text-4xl font-semibold'>
              Unlock the Power of code
              <div className='text-lg font-normal mt-2'>Learn to build anything you can imagine</div>
            </div>

          
          </div>

          <h2 className='text-center text-4xl font-semibold mt-10'>review from anthor lerner</h2>
          <ReviewSlider></ReviewSlider>
          <FooterLinks></FooterLinks>
        </div>
      </div>


    </div>

  )
}

export default Home