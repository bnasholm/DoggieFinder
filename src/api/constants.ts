import axios from "axios";

export const API_BASE = "https://frontend-take-home-service.fetch.com";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
