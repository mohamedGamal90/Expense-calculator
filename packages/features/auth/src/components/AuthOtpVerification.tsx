import { StyledButton, StyledText, View, getTokens, useWindowDimensions } from "@aurora/components";
import { OTPInput } from "input-otp";
import { useTranslation } from "react-i18next";
import { Icon } from "@aurora/icons";
import { useState } from "react";
import { ResendOtpBtn } from "@aurora/blocks";

const CELL_COUNT = 4;
export const AuthOtpVerification = ({
  onSubmit,
  isPending,
  credential,
  onResendOtp,
  otpError,
}: {
  onSubmit: (otp: string) => void;
  isPending: boolean;
  credential: string;
  onResendOtp?: () => void;
  otpError: string;
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { color } = getTokens();
  const { height: screenHeight } = useWindowDimensions();

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
    if (/^\d+$/.test(otp)) {
      onSubmit(otp);
      setOtp("");
      return;
    }
    setError(t("validation.otp-error-message"));
    setOtp("");
  };

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
        <View fd="row" alignItems="center" $xs={{ gap: "$m" }} gap="$ml">
          <Icon name={verifyObject.icon} color={color.secondary800.val} />
          <StyledText variant="Headingxl" color="$neutral800">
            {verifyObject.txt}
          </StyledText>
        </View>
        <View $xs={{ ml: "$xl" }} marginLeft="$2xl" marginTop="$base">
          <StyledText variant="BodymL" col="$neutral800" mb="$s">
            {t("validation.otp-sent-message")}
          </StyledText>
          <StyledText variant="BodymL" col="$neutral800" mb="$l">
            {credential}
          </StyledText>
          <OTPInput
            maxLength={CELL_COUNT}
            onChange={setOtp}
            value={otp}
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
                    {slot.char !== null && <StyledText col="$secondary800">{slot.char}</StyledText>}
                  </View>
                ))}
              </View>
            )}
          />
          {(otpError || error) && (
            <View h="$s">
              <StyledText pt="$s" variant="Bodym" color="$error500">
                {otpError ? t(`server-error.${otpError}`) : error}
              </StyledText>
            </View>
          )}
          {onResendOtp && <ResendOtpBtn onPress={onResendOtp} />}
        </View>
      </View>
      <StyledButton
        isLoading={isPending}
        disabled={otp.length < CELL_COUNT}
        onPress={validateOtp}
        variant="primary">
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
