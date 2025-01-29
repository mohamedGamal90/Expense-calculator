import * as SecureStore from "expo-secure-store";
import { StoreKey } from "./types";

// Check if we are in a web environment
const isWeb = typeof window !== "undefined";

export const getValue = async (key: StoreKey) => {
  try {
    if (isWeb) {
      // For web, get token from session storage
      return sessionStorage.getItem(key);
    } else {
      // For mobile, get token from SecureStore
      const credentials = await SecureStore.getItemAsync(key);
      return credentials;
    }
  } catch (error) {
    console.error("Error getting value", error);
    return;
  }
};

export const setValue = async (key: StoreKey, value: string) => {
  try {
    if (isWeb) {
      // For web, set token in session storage
      sessionStorage.setItem(key, value);
    } else {
      // For mobile, set token in SecureStore
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error("Error setting value", error);
  }
};

export const deleteValue = async (key: StoreKey) => {
  try {
    if (isWeb) {
      // For web, remove token from session storage
      sessionStorage.removeItem(key);
    } else {
      // For mobile, remove token from SecureStore
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error("Error deleting value", error);
  }
};
