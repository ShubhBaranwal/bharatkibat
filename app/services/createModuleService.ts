import { apiService } from "@/app/lib/apiService";
import { CategoryResponse } from "../lib/categoryTypes";

export const createModuleService = (base: string) => ({
  list: (params?: any) => apiService.get<CategoryResponse>(`${base}`, params),

  getOne: (params: { id?: string; slug?: string }) =>
    apiService.get(`${base}`, params),

  create: <T, B>(body: B) => apiService.post<T, B>(`${base}`, body),

  update: <T, B>(params: { id?: string; slug?: string }, body: B) =>
    apiService.patch<T, B>(`${base}`, body, params),

  remove: <T>(params: { id?: string; slug?: string }) =>
    apiService.delete<T>(`${base}`, params),
});
