// import axios from "axios";

// export const axiosInstance = axios.create({});

// export const apiConnector = (method,url,bodyData,headers,params) => {
//     return({
//        method: `${method}`,
//        url:`${url}`,
//        data:bodyData ? bodyData : null,
//         headers : headers ? headers:null,  
//         params:params ? params:null                                     
//     });
// }

// import axios from "axios";

// export const axiosInstance = axios.create({ withCredentials: true });

// export const apiConnector = async (method, url, bodyData = null, headers = null, params = null) => {
//     try {
//         const response = await axiosInstance({
//             method: method,
//             url: url,
//             data: bodyData,
//             headers: headers,
//             params: params,
//         });

//         console.log("✅ API SUCCESS:", response.data);
//         return response;
//     } catch (error) {
//         console.error("❌ API ERROR:", error.response?.data || error.message);
//         throw error;
//     }
// };

