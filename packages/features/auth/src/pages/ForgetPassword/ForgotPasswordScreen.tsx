import { View } from "tamagui";
import { useFocusEffect, useRouter } from "expo-router";
import { StyledButton, StyledText } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { ValidateUsername } from "./components/ValidateUsername";
import { ResetPassword } from "./components/ResetPassword";

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState<"VALIDATE_USERNAME" | "RESET_PASSWORD">("VALIDATE_USERNAME");
  const [username, setUsername] = useState<string>("");

  const STEPS = {
    VALIDATE_USERNAME: <ValidateUsername setUsername={setUsername} setStep={setStep} />,
    RESET_PASSWORD: <ResetPassword username={username} setStep={setStep} />,
  };

  return (
    <View f={1} paddingHorizontal="$s" bg="$white">
      <StyledButton
        variant="outlined"
        bc="$gray9"
        py="$xs"
        mb="$s"
        w={50}
        icon={<Icon name="arrow-left" color="black" />}
        onPress={() => router.push("auth/login")}
      />

      <StyledText
        variant="Heading2xl"
        mt="$l"
        $gtMd={{ variant: "Heading5xl" }}
        col="$secondary900"
        mb="$l">
        {t("titles.forgotPassword")} {/* Translated title */}
      </StyledText>

      {STEPS[step]}
    </View>
  );
};
