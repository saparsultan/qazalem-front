"use client";
import { useAuthContext } from "@/providers/AuthProvider";
import AuthService from "@/services/AuthService";

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refreshToken = localStorage.getItem("refresh");

  const refresh = async () => {
    const res = await AuthService.refresh(refreshToken);
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(res?.data?.access);
      localStorage.setItem("token", res?.data?.access);
      return { ...prev, accessToken: res?.data?.access };
    });
    return res.data.access;
  };
  return refresh;
};

export default useRefreshToken;
