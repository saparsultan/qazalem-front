import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import AuthService from "@/services/AuthService";

let token;
let refreshToken;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
  refreshToken = localStorage.getItem("refresh");
}

const $api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const $apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

$apiPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

$apiPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await AuthService.refresh(refreshToken);
      localStorage.setItem("token", newAccessToken?.data?.access);
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken?.data?.access}`;
      return $apiPrivate(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default $api;
