"use client";
import { $apiPrivate } from "@/utils/http";
import { useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    const requestIntercept = $apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = $apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return $apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      $apiPrivate.interceptors.request.eject(requestIntercept);
      $apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return $apiPrivate;
};

export default useAxiosPrivate;
