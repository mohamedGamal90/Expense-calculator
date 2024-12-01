import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";

// Check if we are in a web environment
const isWeb = typeof window !== "undefined";

export const getValue = async (key: string) => {
  try {
    if (isWeb) {
      // For web, get token from cookies
      return Cookies.get(key);
    } else {
      // For mobile, get token from SecureStore
      const credentials = await SecureStore.getItemAsync(key);
      return credentials;
    }
  } catch (error) {
    console.log("Error getting value", error);
  }
};

export const setValue = async (key: string, value: string) => {
  try {
    if (isWeb) {
      // For web, set token in cookies
      Cookies.set(key, value, { expires: 7 }); // Expires in 7 days
    } else {
      // For mobile, set token in SecureStore
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.log("Error setting value", error);
  }
};

export const deleteValue = async (key: string) => {
  try {
    if (isWeb) {
      // For web, remove token from cookies
      Cookies.remove(key);
    } else {
      // For mobile, remove token from SecureStore
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.log("Error deleting value", error);
  }
};
