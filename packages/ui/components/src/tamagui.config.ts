import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { config as tamaguiConfig } from "@tamagui/config/v3";

const size = {
  0: 0,
  1: 5,
  2: 10,
  true: 10,
};

const theme = {
  radius: {
    xxs: 2,
    xs: 4,
    s: 6,
    sm: 8,
    m: 10,
    ml: 12,
    l: 16,
    xl: 24,
    round: 32,
    full: 9999,
  },
  space: {
    none: 0,
    xxs: 2,
    xs: 4,
    s: 8,
    sm: 12,
    m: 16,
    base: 20,
    ml: 24,
    l: 32,
    xl: 40,
    $2xl: 48,
    $3xl: 56,
    $4xl: 64,
    $5xl: 80,
    $6xl: 96,
    auto: "auto",
    true: 16,
  },
  color: {
    white: "#FFFFFF",
    black: "#000000",

    primary100: "#D8EEFF",
    primary50: "#EEF8FF",
    primary200: "#BAE1FF",
    primary300: "#8AD0FF",
    primary400: "#53B6FF",
    primary500: "#2B94FF",
    primary600: "#1476FC",
    primary700: "#0D5DE8",
    primary800: "#1352CC",
    primary900: "#154393",
    primary950: "#122A59",

    secondary50: "#FFFFFF",
    secondary100: "#E6E6E7",
    secondary200: "#D0D0D1",
    secondary300: "#B0AEB2",
    secondary400: "#87868A",
    secondary500: "#6C6B6F",
    secondary600: "#5D5B5F",
    secondary700: "#4F4E50",
    secondary800: "#414042",
    secondary900: "#3C3C3D",
    secondary950: "#272527",

    accent50: "#0466C8",
    accent100: "#0353A4",
    accent200: "#023E7D",
    accent300: "#002855",
    accent400: "#001845",
    accent500: "#001233",
    accent600: "#33415C",
    accent700: "#5C677D",
    accent800: "#7D8597",
    accent900: "#979DAC",

    neutral50: "#FFFFFF",
    neutral100: "#EFEFEF",
    neutral200: "#DCDCDC",
    neutral300: "#BDBDBD",
    neutral400: "#989898",
    neutral500: "#7C7C7C",
    neutral600: "#656565",
    neutral700: "#525252",
    neutral800: "#464646",
    neutral900: "#3D3D3D",
    neutral950: "#292929",

    success50: "#ECFDF3",
    success100: "#D2F9E0",
    success200: "#A8F2C6",
    success300: "#70E5A7",
    success400: "#37D083",
    success500: "#13B66A",
    success600: "#089355",
    success700: "#067647",
    success800: "#085D3A",
    success900: "#074D31",
    success950: "#032B1D",

    warning50: "#FFFAEC",
    warning100: "#FFF3D3",
    warning200: "#FFE4A5",
    warning300: "#FFCE6D",
    warning400: "#FFAE32",
    warning500: "#FF930A",
    warning600: "#FF7B00",
    warning700: "#CC5902",
    warning800: "#A1450B",
    warning900: "#A1450B",
    warning950: "#461B04",

    error50: "#fdf4f3",
    error100: "#fbe7e5",
    error200: "#f9d2cf",
    error300: "#f4b2ad",
    error400: "#ec857d",
    error500: "#df5e54",
    error600: "#cb4137",
    error700: "#ad342b",
    error800: "#8d2e27",
    error900: "#762c26",
    error950: "#40120f",

    transparent: "transparent",
  },
};

const tokens = createTokens({
  ...theme,
  size,
  zIndex: tamaguiConfig.tokens.zIndex,
});

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

export type DesignSystemTokens = typeof theme;

export const config = createTamagui({
  ...tamaguiConfig,
  themes: {
    ...tamaguiConfig.themes,
  },
  tokens: tokens,
  fonts: {
    heading: interFont,
    body: interFont,
  },
});

export default config;
