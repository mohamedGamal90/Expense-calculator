import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

export type Lang = "en" | "ar";

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

export default i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: I18nManager.isRTL ? "ar" : "en",
  supportedLngs: ["en", "ar"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});
