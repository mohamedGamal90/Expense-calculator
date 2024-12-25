import axios from "axios";
import { StoreKey, getValue } from "@aurora/utils";
import { router } from "expo-router";
import { deleteValue } from "@aurora/utils/src/protectedStore";
import { showAlert } from "@aurora/components";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

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
  const token = await getValue(StoreKey.AccessToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

authApiClient.interceptors.response.use(undefined, error => {
  if (error?.response?.status) {
    switch (error.response.status) {
      case 401:
        showAlert({
          title: "User session expired",
          message: "Please login again",
        });
        queryClient.removeQueries({ queryKey: ["cardList", "cardTransactions"] });
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
