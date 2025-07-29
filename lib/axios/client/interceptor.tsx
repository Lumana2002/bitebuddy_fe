import axios from "axios";
import promise from "promise";

var axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers (client-side only)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add Bearer prefix
      }
    }
    return config;
  },  
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("An error occurred while logging in to the application.");
      return promise.reject(error);
    } else {
      return promise.reject(error);
    }
  }
);

export default axiosInstance;
