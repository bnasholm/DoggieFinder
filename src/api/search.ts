import { cleanParams } from "../utils";
import axiosInstance from "./constants";

// get all dog breeds
export const getAllDogBreeds = async () => {
  const response = await axiosInstance.get(`/dogs/breeds`);
  return response.data;
};

/* Search params:
 *
 * breeds - an array of breeds
 * zipCodes - an array of zip codes
 * ageMin - a minimum age
 * ageMax - a maximum age
 *
 * size - the number of results to return; defaults to 25 if omitted
 * from - a cursor to be used when paginating results (optional)
 * sort - the field by which to sort results, and the direction of the sort; in the format sort=field:[asc|desc].
 * results can be sorted by the following fields:
 * breed
 * name
 * age
 * Ex: sort=breed:asc
 */

type SearchParams = {
  breeds: string[];
  zipCodes: string[];
  ageMin: number;
  ageMax: number;
  from?: number;
  size?: number;
  sort?: string;
};

/* Returns an object with the following properties:
 *
 * resultIds - an array of dog IDs matching your query
 * total - the total number of results for the query (not just the current page)
 * next - a query to request the next page of results (if one exists)
 * prev - a query to request the previous page of results (if one exists)
 */
export const searchDogs = async (params: SearchParams) => {
  const cleanedParams = cleanParams(params);
  const query = new URLSearchParams(
    Object.fromEntries(
      Object.entries(cleanedParams).map(([key, value]) => [key, String(value)])
    )
  ).toString();

  const response = await axiosInstance.get(
    `/dogs/search${query !== "" ? `?${query}` : ""}`
  );
  return response.data;
};

// get dogs by ids
export const fetchDogsByIds = async (ids: string[]) => {
  const response = await axiosInstance.post(`/dogs`, ids);
  return response.data;
};
