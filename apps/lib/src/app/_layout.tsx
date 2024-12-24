import { TamaguiProvider, Alert } from "@aurora/components";
import { Slot } from "expo-router";
import { config } from "../theme";
import { useLoadAssets } from "@aurora/utils";
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
import "@aurora/localization";

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
