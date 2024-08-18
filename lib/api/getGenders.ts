import { axiosInstance } from "@/lib/axios"

export const getGenders = async () => {
  const response = await axiosInstance.get("/genders");
  return response.data;
};