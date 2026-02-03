import React, { useState } from "react"
import {HomePageExplore}  from "../../../data/homepage-explore"
import HighlightText from "./HighlightText"
import ReviewCard from "./ReviewCard"
// import CourseCard from "./CourseCard";
//import ExploreByTag from "/ExploreByTag";



const tabsName = [
      "Free",
      "New to coding",
      "Most to Popular",
      "skill paths",
      "Career Paths"                                            
]

const ExploreMore = () => {
       
      const [currentTab,setCurrentTab] = useState(tabsName[0]); 
      const [courses, setCourses] = useState(HomePageExplore[0].courses);
      const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)   
      
      const setMyCards = (value)=> {
          setCurrentTab(value);
            const result = HomePageExplore.filter((course) => course.tag === value);
          setCourses (result[0].courses);
          setCurrentCard(result[0].courses[0].heading);
      }

      return (
           <div className="bg-gray-900 py-16">
              <div className="w-11/12 max-w-maxContent mx-auto">
                  <div className="text-4xl font-semibold text-center mb-4">
                      Unlock the
                      <HighlightText text={"Power of code"}></HighlightText>
                  </div>

                  <p className="text-center text-richblack-300 text-lg font-medium mb-8">
                      Learn to build anything you can imagine
                  </p>

                  <div className="flex flex-row rounded-full bg-richblack-700 mb-8 border border-richblack-600 px-1 py-1 mx-auto w-fit">
                      {
                      tabsName.map((element,index) => {
                           return(
                                 <div
                                       key={index}
                                       className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-yellow-400 text-black font-bold" : "text-richblack-300"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-600 hover:text-white px-8 py-3`}
                                       onClick={() => setMyCards(element)}
                                 >
                                       {element}
                          </div>
                           )
                      })
                }

                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                      {courses.map((course, index) => (
                          <div
                              key={index}
                              className="bg-richblack-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-yellow-400/30 hover:border-yellow-400 transform hover:-translate-y-2 relative overflow-hidden group min-h-[400px] flex flex-col"
                          >
                              {/* Gradient overlay on hover */}
                              <div className='absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl'></div>

                              {/* Course Image Placeholder with enhanced styling */}
                              <div className='w-full h-48 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden'>
                                  <div className='absolute inset-0 bg-black/20'></div>
                                  <span className='text-black font-bold text-4xl relative z-10 drop-shadow-lg'>{course.heading.charAt(0)}</span>
                                  {/* Floating badge */}
                                  <div className='absolute top-4 right-4 bg-black/70 text-yellow-400 text-sm px-3 py-1 rounded-full font-medium'>
                                      {course.level || "Beginner"}
                                  </div>
                              </div>

                              <div className='relative z-10 flex-1 flex flex-col'>
                                  <h3 className='text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-200'>{course.heading}</h3>
                                  <p className='text-richblack-300 mb-6 text-base line-clamp-3 leading-relaxed flex-1'>{course.description}</p>

                                  <div className='flex justify-between items-center text-sm text-richblack-400 mb-6'>
                                      <div className='flex items-center gap-2'>
                                          <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                                              <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/>
                                          </svg>
                                          <span>Level: {course.level || "N/A"}</span>
                                      </div>
                                      <div className='flex items-center gap-2'>
                                          <svg className='w-5 h-5 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                                              <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'/>
                                          </svg>
                                          <span>Lessons: {course.lessonNumber || "N/A"}</span>
                                      </div>
                                  </div>

                                  {/* Enhanced Price and Cart Button */}
                                  <div className='flex justify-between items-center mt-auto'>
                                      <div className='flex flex-col'>
                                          <span className='text-yellow-400 font-bold text-2xl'>
                                              ${course.price || "Free"}
                                          </span>
                                          {course.price && <span className='text-richblack-400 text-sm line-through'>$99</span>}
                                      </div>
                                      <button className='bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 flex items-center gap-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 relative overflow-hidden group/btn'>
                                          <div className='absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200'></div>
                                          <svg className='w-6 h-6 relative z-10' fill='currentColor' viewBox='0 0 20 20'>
                                              <path d='M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'/>
                                          </svg>
                                          <span className='relative z-10'>Add to Cart</span>
                                      </button>
                                  </div>
                              </div>

                              {/* Subtle bottom accent */}
                              <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
                          </div>
                      ))}
                  </div>
              </div>
           </div>
      )                                            
}

export default ExploreMore
