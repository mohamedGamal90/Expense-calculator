import axios from "axios";
import { protectedStore } from "@aurora/utils";

export const getApiUrl = (url: string) => {
  return `${process.env.EXPO_PUBLIC_API_URL}${url}`;
};

const apiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

const authApiClient = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
});

authApiClient.interceptors.request.use(async config => {
  const token = await protectedStore.getValue("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { apiClient, authApiClient };
