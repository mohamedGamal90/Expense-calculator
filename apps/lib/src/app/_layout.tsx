import { TamaguiProvider } from "@aurora/components";
import { Slot } from "expo-router";
import "@aurora/localization";
import { config } from "../theme";
import { useLoadAssets } from "@aurora/utils";
import {
  Inter_400Regular,
  Inter_900Black,
  Inter_300Light,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

export default function RootLayout() {
  const { isLoaded } = useLoadAssets({
    fonts: {
      Inter_400Regular,
      Inter_900Black,
      Inter_300Light,
      Inter_500Medium,
      Inter_600SemiBold,
      Inter_700Bold,
    },
  });

  if (!isLoaded) {
    return null;
  }
  return (
    <TamaguiProvider config={config}>
      <Slot />
    </TamaguiProvider>
  );
}
