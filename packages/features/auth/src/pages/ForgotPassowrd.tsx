import { FormContainer } from "@aurora/blocks";
import { View } from "tamagui";
import { forgotPasswordFields } from "../configuration";
import { router } from "expo-router";
import { StyledText } from "@aurora/components";

export const ForgotPassword = () => {
  return (
    <View flex={1} paddingHorizontal="$s" backgroundColor="$white" justifyContent="center">
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
