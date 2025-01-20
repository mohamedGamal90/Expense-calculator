import {
  StyledButton,
  StyledText,
  View,
  getTokens,
  showAlert,
  useMedia,
  useWindowDimensions,
} from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { OTPInput } from "input-otp";
import { useTranslation } from "react-i18next";
import { Icon } from "@aurora/icons";
import { useState } from "react";

const CELL_COUNT = 6;

export const ForgetPasswordVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const { color } = getTokens();
  const { height: screenHeight } = useWindowDimensions();
  const { gtXs } = useMedia();

  const verifyObject: { icon: "mobile" | "email"; txt: string; iconTxt: JSX.Element } = (() => {
    switch ("email") {
      // case "mobile":
      //   return {
      //     icon: "mobile",
      //     txt: t("validation.verify-phone-number"),
      //     iconTxt: (
      //       <>
      //         <StyledText variant="Bodysm" color="$neutral800">
      //           {t("inputs.phone")}
      //         </StyledText>
      //         <StyledText variant="Bodysm" color="$neutral800">
      //           {t("inputs.number")}
      //         </StyledText>
      //       </>
      //     ),
      //   };
      case "email":
        return {
          icon: "email",
          txt: t("validation.verify-email-address"),
          iconTxt: (
            <StyledText variant="Bodysm" color="$neutral800">
              {t("inputs.email")}
            </StyledText>
          ),
        };
    }
  })();

  const validateOtp = () => {
    if (/^\d+$/.test(otp)) {
      console.log(otp);
      forgetPassword({ otp, username, password });
      return;
    }
    setError(true);
  };

  const { password, username, email } = params as {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () =>
      router.push({
        pathname: "auth/status",
        params: {
          status: "success",
          statusMessage: t("forget-password.success-msg"),
        },
      }),
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  return (
    <View $md={{ h: screenHeight - 110 }} h={screenHeight - 190} jc="space-between">
      <View>
        <View flexDirection="row" gap="$s" marginVertical="$l">
          <View alignItems="center" gap="$xs">
            <View
              w={50}
              h={50}
              bg="$primary800"
              bw={1}
              bc="$primary800"
              br="$full"
              jc="center"
              ai="center">
              <Icon name={verifyObject.icon} color={color.white.val} />
            </View>
            {verifyObject.iconTxt}
          </View>
          <View f={1} h={2} t={25} bg="$primary800" br="$s" />
          <View alignItems="center" gap="$xs">
            <View
              w={50}
              h={50}
              bc="$secondary50"
              bw={1}
              borderColor="$secondary300"
              br="$full"
              jc="center"
              ai="center">
              <Icon name="tick-circle" color={color.secondary300.val} />
            </View>
            <StyledText variant="Bodysm" col="$neutral800">
              {t("status.success")}
            </StyledText>
          </View>
        </View>
        <View flexDirection="row" gap="$ml">
          <Icon name={verifyObject.icon} color={color.secondary800.val} />
          <StyledText variant="Headingxl" color="$neutral800">
            {verifyObject.txt}
          </StyledText>
        </View>
        <View marginLeft="$2xl" marginTop="$base">
          <StyledText variant="BodymL" col="$neutral800" mb="$s">
            {t("validation.otp-sent-message")}
          </StyledText>
          <StyledText variant="BodymL" col="$neutral800" mb="$l">
            {email}
          </StyledText>
          <OTPInput
            maxLength={CELL_COUNT}
            onChange={setOtp}
            inputMode="numeric"
            render={({ slots }) => (
              <View flexDirection="row">
                {slots.map((slot, index) => (
                  <View
                    key={index}
                    jc="center"
                    ai="center"
                    bc={slot.isActive ? "$secondary800" : "$secondary300"}
                    br="$s"
                    bw={2}
                    mr={gtXs ? "$m" : "$s"}
                    h={40}
                    w={40}>
                    {slot.char !== null && <StyledText col="$secondary800">{slot.char}</StyledText>}
                  </View>
                ))}
              </View>
            )}
          />
          {error && (
            <StyledText variant="Bodysm" col="$error600" mt="$sm">
              {t("validation.otp-error-message")}
            </StyledText>
          )}
        </View>
      </View>
      <StyledButton
        isLoading={isPending}
        disabled={otp.length < 6}
        onPress={validateOtp}
        variant="primary">
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
