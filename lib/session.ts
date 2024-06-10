import { cookies } from 'next/headers';
import { axiosInstance } from './axios';

const getAllCookies = (): { [key: string]: string } => {
  const cookieStore = cookies();
  const cookieObject = cookieStore.getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as { [key: string]: string });
  return cookieObject;
};

export const getUserSession = async (): Promise<{ [key: string]: string }> => {
  const cookie = getAllCookies();
  const response = await axiosInstance.get("auth/sessions", {
    headers: {
      uid: cookie["uid"],
      client: cookie["client"],
      "access-token": cookie["access-token"]
    }
  });
  return response.data;
};
