import { FieldGroupType, FieldItem } from "@aurora/blocks";
import { View } from "tamagui";
import { useRouter } from "expo-router";
import { StyledButton, StyledText, TextInput } from "@aurora/components";
import { validations } from "@aurora/utils";
import { AuthLayout } from "../components/AuthLayout";

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

export const ForgotPasswordScreen = () => {
  const router = useRouter();

  function handleSubmit() {
    router.push("new-password");
  }

  return (
    <AuthLayout>
      <View
        flex={1}
        gap="$xl"
        paddingHorizontal="$s"
        backgroundColor="$white"
        justifyContent="center">
        <StyledText variant="Heading4xl" marginBottom="$xl">
          Forget Password
        </StyledText>
        <TextInput borderRadius={"$s"} placeholder="Enter your email" />
        <StyledButton onPress={handleSubmit}>Submit</StyledButton>
      </View>
    </AuthLayout>
  );
};
