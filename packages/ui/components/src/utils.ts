import { createTamagui, createTokens } from "@tamagui/core";
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
  });
}
