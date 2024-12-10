import axios from "axios";
import { protectedStore, StoreKey } from "@aurora/utils";
import { router } from "expo-router";
import { deleteValue } from "@aurora/utils/src/protectedStore";

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
  const token = await protectedStore.getValue(StoreKey.AccessToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApiClient.interceptors.response.use(undefined, error => {
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        deleteValue(StoreKey.AccessToken);
        router.push("auth/login");
        break;
      default:
        break;
    }
  }
  return Promise.reject(error);
});

export { apiClient, authApiClient };
