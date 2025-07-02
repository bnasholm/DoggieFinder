import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/constants";

const ErrorInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return null;
};

export default ErrorInterceptor;
