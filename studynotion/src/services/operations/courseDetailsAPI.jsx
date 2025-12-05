import { toast } from "react-hot-toast"

//import { updateCompletedLectures } from "../../slices/viewCourseSlice "
// import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { courseEndpoints, altCategory } from "../apis"

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
    COURSE_ENROLL_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    GET_COURSES_BY_CATEGORY,
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

export const fetchFullCourseDetailsAuthenticated = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    let result = null;
    try {
        const response = await apiConnector("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, { Authorization: `Bearer ${token}` });
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED API RESPONSE...........", response);
        if (!response.data.success) {
            throw new Error(response.data.message || 'Could not fetch authenticated course details');
        }
        result = response.data;
    } catch (error) {
        console.error("GET_FULL_COURSE_DETAILS_AUTHENTICATED API ERROR...........", error);
        result = error?.response?.data || null;
    }
    toast.dismiss(toastId);
    return result;
}

export const enrollCourse = async (courseId, token) => {
    const toastId = toast.loading("Processing enrollment...")
    let result = null;
    try {
        // POST to COURSE_ENROLL_API (server-side enroll endpoint)
        const response = await apiConnector("POST", COURSE_ENROLL_API, { courseId }, { Authorization: `Bearer ${token}` });
        console.log("ENROLL COURSE API RESPONSE:", response);
        if (!response.data.success) throw new Error(response.data.message || 'Enrollment failed');
        result = response.data;
    } catch (error) {
        console.error("ENROLL COURSE API ERROR:", error);
        result = error?.response?.data || { success: false, message: error.message };
    }
    toast.dismiss(toastId);
    return result;
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
        // normalize: some endpoints return `updatedCourseDetails`, others `data`
        result = response.data.data ?? response.data.updatedCourseDetails ?? response.data;
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
        
        console.log("UPDATE SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section");
        }

        toast.success("Course Section Updated");
        result = response?.data?.data ?? response?.data?.updatedCourseDetails ?? response?.data;
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const creteSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Adding Lecture...");

    try {
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        console.log("CREATE SUBSECTION API RESPONSE............", response);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }

        toast.success("Lecture Added Successfully");
        result = response?.data?.data ?? response?.data?.updatedSection ?? response?.data;
    } catch (error) {
        console.log("CREATE SUBSECTION API ERROR............", error);
        toast.error(error?.message || "Failed to add lecture");
    }

    toast.dismiss(toastId);
    return result;
};

export const getCoursesByCategory = async (categoryId, opts = {}) => {
    // opts: { page, pageSize }
    let result = [];
    try {
        const params = [];
        if (opts.page) params.push(`page=${encodeURIComponent(opts.page)}`);
        if (opts.pageSize) params.push(`pageSize=${encodeURIComponent(opts.pageSize)}`);
        const qs = params.length ? `?${params.join('&')}` : '';
        // Prefer the shorter public route: GET /api/category/:id/courses
        const url = `${altCategory.COURSES_BY_CATEGORY}/${categoryId}/courses${qs}`;
        const response = await apiConnector("GET", url);
        if (!response?.data?.success) throw new Error('Could not fetch courses by category');
        // controller returns { success, data: [..], total, page, pageSize }
        // return the array of courses to callers for simple rendering
        result = response.data.data || [];
    } catch (error) {
        console.error('GET_COURSES_BY_CATEGORY API ERROR............', error);
    }
    return result;
}

// NOTE: `courseEndpoints` is already imported/destructured above; use those constants.

export const updateSubSection = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Updating...");
    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        });

        console.log("UPDATE SUB-SECTION API RESPONSE:", response);

        if (!response.data?.success) {
            throw new Error("Could not update subsection");
        }

        toast.success("Lecture Updated");
        result = response.data.data ?? response.data.updatedSection ?? response.data;
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
        result = response?.data?.data ?? response?.data?.updatedCourseDetails ?? response?.data;
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
        result = response?.data?.data ?? response?.data?.updatedSection ?? response?.data;
    } catch (error) {
        console.log("DELETE SUBSECTION API ERROR............", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};


