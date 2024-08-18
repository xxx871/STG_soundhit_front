import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';

interface LoginData {
  email: string;
  password: string;
}

const authCookies = ['uid', 'client', 'access-token'] as const;

export const login = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/sign_in", data);
    
    authCookies.forEach(cookie => 
      Cookies.set(cookie, response.headers[cookie])
    );

    return response.data;
  } catch (error: any) {
    authCookies.forEach(cookie => Cookies.remove(cookie));

    if (error.response?.data?.errors) {
      throw new Error(error.response.data.errors[0]);
    }

    throw new Error("ログインに失敗しました");
  }
};