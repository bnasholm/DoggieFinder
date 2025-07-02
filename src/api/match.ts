import axiosInstance from "./constants";

// match with ids
export const matchByIds = async (ids: string[]) => {
  const response = await axiosInstance.post(`/dogs/match`, ids);
  return response.data;
};

// get matches
export const getMatches = async () => {
  const response = await axiosInstance.get(`/dogs/match`);
  return response.data;
};
