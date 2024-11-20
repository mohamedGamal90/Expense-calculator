module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"@tamagui/babel-plugin",
				{
					components: ["@aurora/ui", "tamagui"],
					config: "../../packages/ui/components/tamagui.config.ts",
					logTimings: true,
					disableExtraction: process.env.NODE_ENV === "development",
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
