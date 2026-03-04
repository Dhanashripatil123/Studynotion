

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





