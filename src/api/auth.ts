import axiosInstance from "./constants";

type LoginReq = {
  name: string;
  email: string;
};

export const loginUser = async (reqBody: LoginReq) => {
  await axiosInstance.post(`/auth/login`, reqBody);
};

export const logoutUser = async () => {
  await axiosInstance.post(`/auth/logout`);
};
