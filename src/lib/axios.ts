import axios from "axios";
import { API_URL } from "@/config";
const axiosServices = axios.create({ baseURL: API_URL, timeout: 10000 });

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services")
);

// axiosServices.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("serviceToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

 export default axiosServices;
