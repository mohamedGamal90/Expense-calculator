import { router } from "expo-router";
import { newPasswordFields } from "../configuration";
import { FormContainer } from "@aurora/blocks";
import { StyledText, View } from "@aurora/components";

export const NewPassword = () => {
  return (
    <View
      flex={1}
      paddingHorizontal="$s"
      backgroundColor="$white"
      justifyContent="center"
    >
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
