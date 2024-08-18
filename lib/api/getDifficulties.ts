import { axiosInstance } from "@/lib/axios"

export const getDifficulties = async () => {
  const response = await axiosInstance.get("/difficulties");
  return response.data;
};