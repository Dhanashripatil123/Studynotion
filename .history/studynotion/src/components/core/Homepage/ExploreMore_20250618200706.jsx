import React, { useState } from "react"
import HomePageExplore  from "../../../data/homepage-explore"
import HighlightText from "./HighlightText"
//import CourseCard from "./courseCard";



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
           <div>
              <div className="text-4xl font-semibold text-center">
                  Unlock the 
                  <HighlightText text={"Power of code"}></HighlightText>
            </div> 
              
              <p className="text-center text-[#838894] text-sm font-semibold mt-3">
                  Learn to build anything you can imagine 
              </p> 

              <div className="flex flex-row rounded-full bg-black-800 mb-5 border-richblack-100 px-1 py-1 ">
                  {  
                  tabsName.map((element,index) => {
                       return(
                             <div
                                   key={index}
                                   className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-[#000814] text-richblack-5 font-medium" : "text-[#999DAA]"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                                   onClick={() => setMyCards(element)}
                             >
                                   {element}
                      </div>
                       )
                  })
            }

              </div>

              <div className="lg:h-[150px]"></div>
                   {/* course card ka group  */}
                  // create card yourself 
                   <div className="absolute flex flex-row gap-10 justfy-between w-full ">
                        {
                              // courses.map( (element,index)=>{
                              //      return(
                              //       // <CourseCard key={index}
                              //       // cardData={element}
                              //       // currentCard = {currentCard}
                              //       // setCurrentCard = {setCurrentCard} ></CourseCard>
                              //       <div>hiii</div>
                              //      )
                              // })
                        }
                   </div>
              </div>                                       
      )                                            
}

export default ExploreMore
