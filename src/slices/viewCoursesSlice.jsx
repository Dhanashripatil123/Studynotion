import { createSlice } from "@reduxjs/toolkit";
import { setCourse } from "./courseSlice";

const initialState = {
    courseSectionData: [],
    courseSubSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
        setCourseSubSectionData: (state, action) => {
            state.courseSubSectionData = action.payload
        }
     
    }
})

export const {
    setCourseSectionData,
    setCourseSubSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer
