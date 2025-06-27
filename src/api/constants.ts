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

export default axiosInstance;
