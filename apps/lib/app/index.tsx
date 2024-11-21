import { config, TamaguiProvider } from "@aurora/components";
import { LoginPage } from "@aurora/auth";

export default function Index() {
	return (
		<TamaguiProvider config={config}>
			<LoginPage />
		</TamaguiProvider>
	);
}
