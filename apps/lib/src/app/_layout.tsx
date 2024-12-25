import { TamaguiProvider, Alert } from "@aurora/components";
import { Slot } from "expo-router";
import { config } from "../theme";
import {
  Tajawal_200ExtraLight,
  Tajawal_300Light,
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
  Tajawal_800ExtraBold,
  Tajawal_900Black,
} from "@expo-google-fonts/tajawal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@metroid/localization";
import { useLoadAssets } from "@metroid/hooks";
import "dayjs/locale/ar"; // Import Arabic locale
import "dayjs/locale/en"; // Import English locale

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isLoaded } = useLoadAssets({
    fonts: {
      Tajawal_200ExtraLight,
      Tajawal_300Light,
      Tajawal_400Regular,
      Tajawal_500Medium,
      Tajawal_700Bold,
      Tajawal_800ExtraBold,
      Tajawal_900Black,
    },
  });

  if (!isLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <Alert />
        <Slot />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
