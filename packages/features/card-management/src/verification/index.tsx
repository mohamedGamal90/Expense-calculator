import { getTokens, showAlert, StyledButton, StyledText, View } from "@aurora/components";
import { OTPInput } from "input-otp";
import { Icon } from "@aurora/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { ResendOtpBtn } from "@aurora/blocks";
import { useResendOtpMutation } from "./hooks/useResendOtpMutation";

const CELL_COUNT = 4;

export const Verification = ({
  onSubmit,
  type = "mobile",
  credential,
  isPending,
  loading,
}: {
  onSubmit: (otp: string) => Promise<void>;
  credential: string | undefined;
  type?: "mobile" | "email";
  isPending: boolean;
  loading?: boolean;
}) => {
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const { t } = useTranslation();
  const { color } = getTokens();

  const verifyObject: { icon: "mobile" | "email"; txt: string; iconTxt: JSX.Element } = (() => {
    switch ("email") {
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
    if (/^\d+$/.test(otpValue)) {
      onSubmit(otpValue).catch(error => setOtpError(t(`server-error.${error}`)));
      setOtpValue("");
      return;
    }
    setOtpValue("");
  };

  const { mutateAsync: ResendOTP } = useResendOtpMutation({
    onError: () =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("otp.max-resend-otp-reached-msg"),
      }),
  });

  return (
    <View f={1} jc="space-between">
      {loading ? (
        <View flex={1} jc="center" alignItems="center">
          <ActivityIndicator size="large" color={color.primary800.val} />
        </View>
      ) : (
        <>
          <View>
            <View flexDirection="row" gap="$s" marginVertical="$l">
              <View alignItems="center" gap="$xs">
                <View
                  width={50}
                  height={50}
                  backgroundColor="$primary800"
                  borderWidth={1}
                  borderColor="$primary800"
                  borderRadius="$full"
                  justifyContent="center"
                  alignItems="center">
                  <Icon name={verifyObject.icon} color={color.white.val} />
                </View>
                {verifyObject.iconTxt}
              </View>
              <View flex={1} height={2} top={25} bg="$primary800" borderRadius="$s" />
              <View alignItems="center" gap={"$xs"}>
                <View
                  width={50}
                  height={50}
                  backgroundColor="$secondary50"
                  borderWidth={1}
                  borderColor="$secondary300"
                  borderRadius="$full"
                  justifyContent="center"
                  alignItems="center">
                  <Icon name="tick-circle" color={color.secondary300.val} />
                </View>
                <StyledText variant="Bodysm" color="$neutral800">
                  {t("status.success")}
                </StyledText>
              </View>
            </View>
            <View flexDirection="row" alignItems="center" $xs={{ gap: "$m" }} gap="$ml">
              <Icon name={verifyObject.icon} color={color.secondary800.val} />
              <StyledText variant="Headingxl" color="$neutral800">
                {verifyObject.txt}
              </StyledText>
            </View>
            <View $xs={{ ml: "$xl" }} marginLeft="$2xl" marginTop="$base">
              <StyledText variant="BodymL" color="$neutral800" marginBottom="$s">
                {t("validation.otp-sent-message")}
              </StyledText>
              <StyledText variant="BodymL" color="$neutral800" marginBottom="$l">
                {credential}
              </StyledText>
              <>
                <OTPInput
                  maxLength={CELL_COUNT}
                  onChange={value => {
                    if (value === "" || /^\d+$/.test(value)) {
                      setOtpError("");
                    } else {
                      setOtpError(t("validation.otp-error-message"));
                    }
                    setOtpValue(value);
                  }}
                  value={otpValue}
                  inputMode="numeric"
                  render={({ slots }) => (
                    <View flexDirection="row">
                      {slots.map((slot, index) => (
                        <View
                          key={index}
                          $xs={{ h: 35, w: 35, mr: "$s" }}
                          jc="center"
                          ai="center"
                          bc={slot.isActive ? "$secondary800" : "$secondary300"}
                          br="$s"
                          bw={2}
                          mr="$m"
                          h={40}
                          w={40}>
                          {slot.char !== null && (
                            <StyledText col="$secondary800">{slot.char}</StyledText>
                          )}
                        </View>
                      ))}
                    </View>
                  )}
                />
                {otpError && (
                  <View h="$s">
                    <StyledText pt="$s" variant="Bodym" color="$error500">
                      {otpError}
                    </StyledText>
                  </View>
                )}
              </>
              {credential && <ResendOtpBtn onPress={ResendOTP} />}
            </View>
          </View>
          <StyledButton
            isLoading={isPending}
            disabled={otpValue.length < CELL_COUNT}
            onPress={validateOtp}
            variant="primary">
            {t("buttons.next")}
          </StyledButton>
        </>
      )}
    </View>
  );
};
