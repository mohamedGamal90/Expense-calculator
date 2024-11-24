import { TamaguiProvider } from "@aurora/components";
import { Slot, Stack } from "expo-router";
import { config } from "../theme";

export default function RootLayout() {
	return (
		<TamaguiProvider config={config}>
			<Slot />
		</TamaguiProvider>
	);
}
