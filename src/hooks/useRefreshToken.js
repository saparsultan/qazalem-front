// import { cookies } from 'next/headers'
"use client";
import $api from "@//utils/http";
import { useAuthContext } from "@/providers/AuthProvider";

const useRefreshToken = () => {
  // const cookieStore = cookies()
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const res = await $api.post("login/refresh/", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(res?.data?.access);
      return { ...prev, accessToken: res?.data?.access };
    });
    return res.data.access;
  };
  return refresh;
};

export default useRefreshToken;
