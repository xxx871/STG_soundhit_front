import { axiosInstance } from "@/lib/axios"

export const getNotes = async () => {
  const response = await axiosInstance.get("/notes");
  return response.data;
};