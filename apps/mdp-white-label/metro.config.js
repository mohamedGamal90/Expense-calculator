const { getDefaultConfig } = require("@expo/metro-config");
const { mergeConfig } = require("metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");

const defaultConfig = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "cjs", "mjs", "svg"],
  },
};

module.exports = withTamagui(mergeConfig(defaultConfig, customConfig), {
  components: ["tamagui", "@aurora/components"],
  config: "../../packages/ui/components/src/tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
});
