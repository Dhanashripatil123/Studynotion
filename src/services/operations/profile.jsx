import { toast } from "react-hot-toast"
// import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints, courseEndpoints, settingsEndpoints } from "../apis";
import { TaskAbortError } from "@reduxjs/toolkit";
// import logout from "./authAPI"

const { GET_INSTRUCTORDASHBOARD_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints
const { GET_ALL_INSTRUCTOR_COURSES_API } = courseEndpoints
const { UPDATE_PROFILE_API } = settingsEndpoints

// Fetch user details (you can implement this later)
// export function getUserDetails(token, navigate) {
//   // TODO: Add user details fetching logic here
// }

// Fetch enrolled courses
export default async function getUserEnrolledCourses(token) {
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.success) {
      throw new Error(response?.message || 'Could not fetch enrolled courses');
    }

    result = response.data || [];
  } catch (error) {
    console.error("GET_USER_ENROLLED_COURSES_API ERROR: ", error);
    toast.error("Unable to fetch enrolled courses");
  }

  return result;
}

export async function updateProfile(data, token) {
  const toastId = toast.loading('Updating profile...')
  try {
    const response = await apiConnector('PUT', UPDATE_PROFILE_API, data, { Authorization: `Bearer ${token}` })
    console.log('UPDATE PROFILE RESPONSE:', response)
    if (!response?.success) throw new Error(response?.message || 'Update failed')
    toast.success(response?.message || 'Profile updated')
    return response?.data || null
  } catch (err) {
    console.error('UPDATE_PROFILE ERROR:', err)
    toast.error(err?.message || 'Failed to update profile')
    return null
  } finally {
    toast.dismiss(toastId)
  }
}

export async function getInstructorData(token) {
     const toastId = toast.loading("Loading...")
     let result = [];
       try{
           const response = await apiConnector(
             "GET",
              GET_INSTRUCTORDASHBOARD_API,
             null,
             {
               Authorization: `Bearer ${token}`,
             }
           );
           console.log("INSTRUCTOR DASHBOARD RESPONSE: ", response);
           result = response?.data?.courses || [];
        }
      catch(err){
         console.error("GET_INSTRUCTOR_DATA_API ERROR: ", err);
         toast.error("Unable to fetch instructor data");
      }
      toast.dismiss(toastId);
      return result;
}

export async function fetchInstructorCourses(token) {
  const toastId = toast.loading('Loading courses...');
  let result = [];
  try {
    // GET instructor's courses
    const response = await apiConnector('GET', GET_ALL_INSTRUCTOR_COURSES_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log('FETCH INSTRUCTOR COURSES RESPONSE: ', response);
    if (response?.success) {
      result = response.data || [];
    }
  } catch (err) {
    console.error('FETCH_INSTRUCTOR_COURSES ERROR: ', err);
    toast.error('Unable to fetch instructor courses');
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}
  
