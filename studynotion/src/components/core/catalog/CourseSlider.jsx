import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import  Course_Card from "./Course_Card";


const CourseSlider = ({courses, Courses})=>{
            const list = courses || Courses || [];
            return(
                   <>
                         {
                               list?.length ? (
                              <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    loop={true}
                                    modules={[Pagination, A11y, Navigation, Scrollbar]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSwiper={(swiper) => console.log('swiper init', swiper)}
                                    onSlideChange={() => console.log('slide change')}
                              >
                                    {list.map((course, index) => (
                                          <SwiperSlide key={course.courseId || course._id || index}>
                                                <Course_Card course={course} Height={"h-[250px]"} />
                                          </SwiperSlide>
                                    ))}
                              </Swiper>
                        ) : (
                   <p>No Course Found</p>                               
                )
                }
          </>                                        
      ) 
}

export default CourseSlider