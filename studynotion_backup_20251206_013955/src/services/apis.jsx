// src/services/apis.jsx
const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

// Auth APIs
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// Other APIs
export const categories = {
  SHOW_ALL_CATEGORIES: BASE_URL + "/course/showAllCategories",
};


export const contactEndpoints = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/FileUpload",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

export const profileEndpoints = {

}



export const courseEndpoints = {
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  COURSE_CATEGORIES_API: BASE_URL + "/course/getAllCategories",
  GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  LECTURE_COMPLETION_API: BASE_URL + "/course/lectureCompletion",
};

