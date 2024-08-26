import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';

const uid = Cookies.get("uid") || '';
const client = Cookies.get("client") || '';
const accessToken = Cookies.get("access-token") || '';

export const getUserSession = async () => {
  if (!uid || !client || !accessToken) {
    return null;
  }

  try {
    const response = await axiosInstance.get("auth/sessions", {
      headers: {
        uid: uid,
        client: client,
        "access-token": accessToken,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user session:", error);
    return null;
  }
};
