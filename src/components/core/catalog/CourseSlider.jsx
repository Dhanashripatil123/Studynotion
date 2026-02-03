import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";

import Course_Card from "./Course_Card";

const CourseSlider = ({ courses, Courses }) => {
  const list = courses || Courses || [];

  const getEnrolledCount = (c) => {
    if (!c) return 0;
    return (
      (Array.isArray(c.studentEnrolled) && c.studentEnrolled.length) ||
      (Array.isArray(c.studentsEnrolled) && c.studentsEnrolled.length) ||
      c.totalStudentsEnrolled ||
      c.enrolledCount ||
      0
    );
  };

  // sort by enrolled count desc to show top courses first
  const sorted = [...(list || [])].sort((a, b) => getEnrolledCount(b) - getEnrolledCount(a));

  return (
    <>
      {sorted?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          modules={[Pagination, A11y, Navigation, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log("swiper init", swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {sorted.map((course, index) => (
            <SwiperSlide
              key={course.courseId || course._id || index}
            >
              <Course_Card course={course} Height={"h-[250px]"} showDelete={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
