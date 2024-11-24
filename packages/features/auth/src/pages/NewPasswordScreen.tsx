import { FieldGroupType, FieldItem } from "@aurora/blocks";
import { StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { validations } from "@aurora/utils";
import { AuthLayout } from "../components/AuthLayout";

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

export const NewPasswordScreen = () => {
	return (
		<AuthLayout>
			<View
				flex={1}
				paddingHorizontal="$s"
				backgroundColor="$white"
				gap="$xl"
				justifyContent="center">
				<StyledText variant="Heading4xl">New Password</StyledText>
				<View gap="$l">
					<TextInput
						borderRadius={"$s"}
						placeholder="Enter your New Password"
					/>
					<TextInput
						borderRadius={"$s"}
						placeholder="Confirm your New Password"
					/>
				</View>
				<StyledButton>Submit</StyledButton>
			</View>
		</AuthLayout>
	);
};
