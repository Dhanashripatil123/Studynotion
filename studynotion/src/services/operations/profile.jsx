import { toast } from "react-hot-toast"
// import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints } from "../apis";
// import logout from "./authAPI"

const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API } = profileEndpoints

// Fetch user details (you can implement this later)
export function getUserDetails(token, navigate) {
  // TODO: Add user details fetching logic here
}

// Fetch enrolled courses
export default async function enrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []

  try{
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    // Debugging log
  console.log("GET_USER_ENROLLED_COURSES_API RESPONSE: ", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    // Store fetched courses in result
    result = response.data.data
  } catch (error) {
    console.error("GET_USER_ENROLLED_COURSES_API ERROR: ", error)
    toast.error("Unable to fetch enrolled courses")
  } finally {
    toast.dismiss(toastId)
  }

  return result
}
