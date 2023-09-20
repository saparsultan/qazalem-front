"use client";
import { $apiPrivate } from "@/utils/http";
import { useEffect } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = localStorage.getItem("notat");

  useEffect(() => {
    const requestIntercept = $apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
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
  }, [auth, refresh]);

  return $apiPrivate;
};

export default useAxiosPrivate;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90e…jQ3fQ.y8kKtjUZqPdEOoQ4rlymP-iXIpvbjiqTw_EMel_biXo
