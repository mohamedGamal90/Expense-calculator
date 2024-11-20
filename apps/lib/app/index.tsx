import { Text, View } from "react-native";
import {
	config,
	StyledButton,
	StyledText,
	TamaguiProvider,
} from "@aurora/components";
import { LoginPage } from "@aurora/blocks";

export default function Index() {
	return (
		<TamaguiProvider config={config}>
			{/* <StyledButton>This is a button</StyledButton>
			<StyledText>This is text</StyledText> */}
			<LoginPage />
		</TamaguiProvider>
	);
}
