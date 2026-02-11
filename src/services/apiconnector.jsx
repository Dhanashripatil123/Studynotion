// import axios from "axios";

// export const axiosInstance = axios.create({ withCredentials: true });

// export const apiConnector = (method,url,bodyData,headers,params) => {
//     return({
//        method: `${method}`,
//        url:`${url}`,
//        data:bodyData ? bodyData : null,
//         headers : headers ? headers:null,  
//         params:params ? params:null                                     
//     });
// }

import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const axiosInstance = axios.create({baseURL: BASE_URL, withCredentials: true });

export const apiConnector = async (method, url, bodyData = null, headers = null, params ) => {
    try {
        const response = await axiosInstance({
            method: method,
            url: url,
            data: bodyData,
            headers: headers,
            params: params,
        });

        console.log("API SUCCESS:", response.data);
        // Return the response payload directly so callers receive { success, message, data }
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        const statusCode = error?.response?.status;

        console.error(" API ERROR:", {
            status: statusCode,
            message: errorMessage,
            fullError: error?.response?.data,
        });
        // Throw the original error so callers can inspect error.response
        throw error;
    }
};


// import axios from "axios";

// // Axios instance
// export const axiosInstance = axios.create({
//     withCredentials: true,
// });

// // // Actual request function
// // export const apiConnector = async (method, url, bodyData, headers, params) => {
// //     try {
// //         const response = await axiosInstance({
// //             method,
// //             url,
// //             data: bodyData || null,
// //             headers: headers || {},
// //             params: params || null,
// //         });
// //         return response;
// //     } catch (error) {
// //         // Optional: Log for debugging
// //         console.error("API Connector Error:", error);
// //         throw error;
// //     }
// // };

// import axios from "axios";

// // A reusable API connector
// export const apiConnector = async (method, url, body = {}, headers = {}, isFormData = false) => {
//     try {
//         const config = {
//             method,
//             url,
//             headers: {
//                 ...headers,
//             },
//         };

//         // Handle body depending on isFormData
//         if (method.toUpperCase() !== "GET") {
//             if (isFormData) {
//                 const formData = new FormData();
//                 for (const key in body) {
//                     formData.append(key, body[key]);
//                 }
//                 config.data = formData;
//                 config.headers["Content-Type"] = "multipart/form-data";
//             } else {
//                 config.data = body;
//             }
//         }

//         const response = await axios(config);
//         return response;
//     } catch (error) {
//         console.error(" API ERROR: ", error.response || error.message);
//         throw error;
//     }
// };

