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

// Axios instance (NO baseURL)
export const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = {},
  params = null
) => {
  try {
    const response = await axiosInstance({
      method,
      url, // FULL URL comes from apis.jsx
      data: bodyData,
      headers,
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "API ERROR:",
      error?.response?.data || error.message
    );
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

