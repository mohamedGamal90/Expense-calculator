export * from "./button";
export * from "tamagui";
export * from "./tamagui.config";
export * from "./text";
export * from "./utils";
export * from "./pill";
export * from "./input";
export * from "./RootView";
export * from "./RadioGroupItemWithLabel";
export * from "./StyledDialog";

import type { config } from "./tamagui.config";

export type AppConfig = typeof config;

declare module "tamagui" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}

declare module "@aurora/components" {
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends AppConfig {}
}
