import axiosInstance from "./constants";

type LoginReq = {
  name: string;
  email: string;
};

export const loginUser = async (reqBody: LoginReq) => {
  // req : { name, email }
  try {
    await axiosInstance.post(`/auth/login`, reqBody);
    // if successful response, browser will automatically send
    // this cookie with all successive credentialed requests to the API
  } catch (error) {
    console.log("error:", error);
  }
};
