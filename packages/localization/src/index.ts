import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import { isRtl, useSettingStore } from "@metroid/store";

import ar from "./locales/ar.json";
import en from "./locales/en.json";
import { isWeb } from "@aurora/utils";
import * as Updates from "expo-updates";

export type Lang = "en" | "ar";

const resources = {
  ar: {
    translation: ar,
  },
  en: {
    translation: en,
  },
};

export const changeLang = async (language: Lang) => {
  const isRtl = language === "ar" ? true : false;
  I18nManager.forceRTL(isRtl);
  I18nManager.allowRTL(isRtl);
  i18n.changeLanguage(language);
  useSettingStore.getState().toggleLang(language);

  if (!isWeb) {
    await Updates.reloadAsync();
  }
};

export default i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: isRtl ? "ar" : "en",
  supportedLngs: ["en", "ar"],
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});
