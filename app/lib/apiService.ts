import axiosClient from "./axiosClient";

export const apiService = {
  get: async <T>(url: string, params?: Record<string, unknown>) => {
    const res = await axiosClient.get<T>(url, { params });
    return res.data;
  },

  post: async <T, B>(url: string, body: B) => {
    const res = await axiosClient.post<T>(url, body);
    return res.data;
  },

  patch: async <T, B>(url: string, body: B, params?: Record<string, unknown>) => {
    const res = await axiosClient.patch<T>(url, body, { params });
    return res.data;
  },

  put: async <T, B>(url: string, body: B) => {
    const res = await axiosClient.put<T>(url, body);
    return res.data;
  },

  delete: async <T>(url: string, params?: Record<string, unknown>) => {
    const res = await axiosClient.delete<T>(url, { params });
    return res.data;
  },
};
