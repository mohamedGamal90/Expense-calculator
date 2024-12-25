import { useEffect } from "react";
import { useFonts } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

export function useLoadAssets({ fonts }: { fonts: { [x: string]: number } }) {
  const [hasLoadedFonts, loadingFontsError] = useFonts({
    ...fonts,
  });

  useEffect(() => {
    if (loadingFontsError) throw loadingFontsError;
  }, [loadingFontsError]);

  useEffect(() => {
    if (hasLoadedFonts) {
      SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts]);

  return { isLoaded: hasLoadedFonts };
}
