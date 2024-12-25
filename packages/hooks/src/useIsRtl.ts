import { useSettingStore } from "@metroid/store";

export const useIsRtl = () => {
  const { lang } = useSettingStore();
  return lang === "ar";
};
