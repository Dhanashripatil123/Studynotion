import { toast } from "react-hot-toast"

//import { updateCompletedLectures } from "../../slices/viewCourseSlice "
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
} = courseEndpoints


export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            throw new Error("Could not fetch all courses")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log("EDIT COURSE API RESPONSE...........", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR........", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};





export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    // dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE...........", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR...........", error)
        result = error.response.data
        // toast.error(error.response.data.message)
    }

    toast.dismiss(toastId)
    // dispatch(setLoading(false));
    return result
}

export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE...........", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories")
        }

        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR...........", error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })

        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }

        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}

export const createSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Creating Section...");

    try {
        // ✅ Always wrap in try and await properly
        const response = await apiConnector(
            "POST",
            CREATE_SECTION_API,
           data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("CREATE SECTION API RESPONSE............", response);

        if (!response || !response.data || !response.data.success) {
            throw new Error("Could Not Create Section");
        }

        toast.success("Course Section Created");
        result = response.data;
    } catch (error) {
        console.error("CREATE SECTION API ERROR............", error);
        toast.error(error?.message || "Failed to create section");
    } finally {
        toast.dismiss(toastId);
    }

    return result;
};



export const updatedSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        console.log("UPDATE SECTION API RESPONSE............", response.data)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }

        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }

    toast.dismiss(toastId)
    return result
}

import { endpoints } from "../apis";
// import { apiConnector } from "./apiconnector";
// import toast from "react-hot-toast";

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector("POST", endpoints.UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("UPDATE SUB-SECTION API RESPONSE:", response);

        if (!response.data?.success) {
            throw new Error("Could not update subsection");
        }

        toast.success("Lecture Updated");
        result = response.data.data;
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR:", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
};


// delete a section
export const deleteSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE SECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }

        toast.success("Course Section Deleted");
        result = response?.data?.data;
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};


export const deleteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API , data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("DELETE SUBSECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Delete subSection");
        }

        toast.success("Course SubSection Deleted");
        result = response?.data?.data;
    } catch (error) {
        console.log("DELETE SUBSECTION API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};


