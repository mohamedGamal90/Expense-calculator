import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { config as tamaguiConfig } from "@tamagui/config/v3";
import type { DesignSystemTokens } from "./tamagui.config";
const size = {
  0: 0,
  1: 5,
  2: 10,
  $3: 15,
  $4: 20,
  $5: 25,
  $6: 30,
  true: 10,
};

const interFont = createFont({
  family: "Inter_400Regular",
  size: {
    1: 12,
    2: 14,
    3: 15,
    $4: 18,
  },
  lineHeight: {
    // 1 will be 22
    2: 22,
  },
  weight: {
    1: "300",
    // 2 will be 300
    3: "600",
  },
  letterSpacing: {
    1: 0,
    2: -1,
    // 3 will be -1
  },
  // (native only) swaps out fonts by face/style
  face: {
    300: { normal: "Inter_300Light" },
    500: { normal: "Inter_500Medium" },
    600: { normal: "Inter_600SemiBold" },
    700: { normal: "Inter_700Bold" },
    900: { normal: "Inter_900Black" },
  },
});
export function createConfig(tokens: DesignSystemTokens) {
  const _tokens = createTokens({
    ...tokens,
    size,
    zIndex: tamaguiConfig.tokens.zIndex,
  });

  return createTamagui({
    ...tamaguiConfig,
    themes: {
      ...tamaguiConfig.themes,
    },
    tokens: _tokens,
    fonts: {
      heading: interFont,
      body: interFont,
    },
  });
}
