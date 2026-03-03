import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
});
// console.log(API, "baseURLlllllllll")
console.log(import.meta.env.VITE_API_URL, "tttttt")
// Request interceptor (attach token automatically)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;