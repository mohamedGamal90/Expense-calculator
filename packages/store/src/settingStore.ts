import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { StateCreator, create } from "zustand";
import { Lang } from "@metroid/localization";
import { isWeb } from "@aurora/utils";

type SettingState = {
  showWalkthrough: boolean;
  hasHydrated: boolean;
  lang: Lang | null;
};

type SettingActions = {
  toggleWalkthrough: () => void;
  toggleLang: (lang: Lang) => void;
};

export const settingSlice: StateCreator<
  SettingState & SettingActions,
  [["zustand/persist", unknown]]
> = set => ({
  showWalkthrough: true,
  hasHydrated: false,
  lang: "en",
  toggleWalkthrough: () => set({ showWalkthrough: false }),
  toggleLang: (lang: Lang) => set({ lang }),
});

export const useSettingStore = create<SettingState & SettingActions>()(
  persist(settingSlice, {
    name: "setting-store",
    storage: createJSONStorage(() => (isWeb ? localStorage : AsyncStorage)),
    onRehydrateStorage: () => () => {
      useSettingStore.setState({ hasHydrated: true });
    },
  }),
);
export const isRtl = useSettingStore.getState().lang === "ar";
