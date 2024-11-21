import { router } from "expo-router";
import { FieldGroupType, FieldItem, FormContainer } from "@aurora/blocks";
import { StyledText, View } from "@aurora/components";
import { validations } from "@aurora/utils";

const newPasswordFields: (FieldItem | FieldGroupType)[] = [
	{
		fieldName: "password",
		placeholder: "Enter your New Passowrd",
		keyboardType: "default",
		validation: validations.password,
		layout: "row",
		iconLeft: "password",
		secureTextEntry: true,
	},
	{
		fieldName: "confirm-password",
		placeholder: "Enter your New Passowrd",
		keyboardType: "default",
		validation: validations.password,
		layout: "row",
		iconLeft: "password",
		secureTextEntry: true,
	},
];

export const NewPassword = () => {
	return (
		<View
			flex={1}
			paddingHorizontal="$s"
			backgroundColor="$white"
			justifyContent="center">
			<StyledText variant="Heading4xl" marginBottom="$xl">
				New Password
			</StyledText>
			<FormContainer
				fields={newPasswordFields}
				onSubmit={() => router.push("newPassword")}
			/>
		</View>
	);
};
