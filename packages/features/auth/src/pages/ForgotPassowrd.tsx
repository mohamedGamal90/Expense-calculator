import { FieldGroupType, FieldItem, FormContainer } from "@aurora/blocks";
import { View } from "tamagui";
import { router } from "expo-router";
import { StyledText } from "@aurora/components";
import { validations } from "@aurora/utils";

const forgotPasswordFields: (FieldItem | FieldGroupType)[] = [
	{
		fieldName: "email",
		placeholder: "Enter your email",
		keyboardType: "email-address",
		validation: validations.email,
		layout: "row",
		iconLeft: "email",
	},
];

export const ForgotPassword = () => {
	return (
		<View
			flex={1}
			paddingHorizontal="$s"
			backgroundColor="$white"
			justifyContent="center">
			<StyledText variant="Heading4xl" marginBottom="$xl">
				Forget Password
			</StyledText>
			<FormContainer
				fields={forgotPasswordFields}
				onSubmit={() => router.push("newPassword")}
			/>
		</View>
	);
};
