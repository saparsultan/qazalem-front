import axios from "axios";
import { BASE_URL } from "@/utils/constants";

const $api = axios.create({
  baseURL: BASE_URL,
});

export const $apiPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// apiInstance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
// });

// apiInstance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status == 401) {
//       console.log("error", error);
//       return apiInstance.request(originalRequest);
//     }
//   },
// );

export default $api;
