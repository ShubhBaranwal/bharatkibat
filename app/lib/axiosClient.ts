import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // base always `/api`
  headers: { "Content-Type": "application/json" },
  timeout: 9000,
});

// Attach token IF EXISTS
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error formatting
axiosClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Network error";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
