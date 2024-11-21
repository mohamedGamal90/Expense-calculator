import { StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { Image } from "expo-image";
import { Icon } from "@aurora/icons";

export function LoginPage() {
	return (
		<View paddingHorizontal={"$6xl"} flex={1} flexDirection="row">
			<View
				w={"50%"}
				alignItems="center"
				paddingHorizontal={"$3xl"}
				paddingVertical={"$base"}>
				<View width={"100%"} paddingVertical={"$base"}>
					<Icon name="MDPWordmark" />
				</View>
				<View my={"$auto"} w={"100%"} gap={"$5xl"} justifyContent="center">
					<StyledText fontWeight={"$black"} variant="Heading4xl">
						Log In
					</StyledText>
					<View gap={"$space.xl"}>
						<StyledText variant="Heading4xl">Welcome Back to MDP</StyledText>
						<View gap={"$m"}>
							<TextInput borderRadius={"$s"} placeholder="Enter your email" />
							<View>
								<TextInput
									borderRadius={"$s"}
									placeholder="Enter your password"
									secureTextEntry
								/>
								<StyledText
									color={"$primary800"}
									padding="$space.s"
									variant="BodyBoldsm"
									alignSelf="flex-end">
									Forgot your password?
								</StyledText>
							</View>
						</View>
						<StyledButton>Login</StyledButton>
						<View w={"100%"} alignItems="center">
							<View
								flexDirection="row"
								paddingBottom={"$3xl"}
								gap={"$space.sm"}
								alignItems="center">
								<View
									h={"1px"}
									w={"100px"}
									backgroundColor={"$neutral900"}></View>
								<StyledText>Or</StyledText>
								<View
									h={"1px"}
									w={"100px"}
									backgroundColor={"$neutral900"}></View>
							</View>
							<StyledText>
								Don't have an account?{" "}
								<StyledText variant="BodySemiBoldsm" color={"$primary800"}>
									Sign Up
								</StyledText>
							</StyledText>
						</View>
					</View>
				</View>
			</View>
			<View w={"50%"} backgroundColor={"$primary700"}>
				<Image
					style={{
						flex: 1,
					}}
					source={require("./login-img.png")}
					contentFit="cover"
				/>
			</View>
		</View>
	);
}
