import { getTokens, StyledButton, StyledText, useMedia, View } from "@aurora/components";
import { OTPInput } from "input-otp";
import { Icon } from "@aurora/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ResendOtpBtn } from "./components/resendOtpBtn";
import { ActivityIndicator } from "react-native";

const CELL_COUNT = 6;

export const Verification = ({
  onSubmit,
  type = "mobile",
  credential,
  isPending,
  loading,
}: {
  onSubmit: (otp: string) => void;
  credential: string | undefined;
  type?: "mobile" | "email";
  isPending: boolean;
  loading?: boolean;
}) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const { color } = getTokens();
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
    if (/^\d+$/.test(value)) {
      onSubmit(value);
      return;
    }
    setError(true);
  };

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
                  borderRadius={"$full"}
                  justifyContent="center"
                  alignItems="center">
                  <Icon name="tick-circle" color={color.secondary300.val} />
                </View>
                <StyledText variant="Bodysm" color="$neutral800">
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
              <StyledText variant="BodymL" color="$neutral800" marginBottom="$s">
                {t("validation.otp-sent-message")}
              </StyledText>
              <StyledText variant="BodymL" color="$neutral800" marginBottom="$l">
                {credential}
              </StyledText>
              <OTPInput
                maxLength={CELL_COUNT}
                onChange={setValue}
                inputMode="numeric"
                render={({ slots }) => (
                  <View flexDirection="row">
                    {slots.map((slot, index) => (
                      <View
                        key={index}
                        justifyContent="center"
                        alignItems="center"
                        borderColor={slot.isActive ? "$secondary800" : "$secondary300"}
                        borderRadius="$s"
                        borderWidth={2}
                        mr={gtXs ? "$m" : "$xs"}
                        height={40}
                        width={40}>
                        {slot.char !== null && (
                          <StyledText col="$secondary800">{slot.char}</StyledText>
                        )}
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
              {credential && <ResendOtpBtn />}
            </View>
          </View>
          <StyledButton
            isLoading={isPending}
            disabled={value.length < 6}
            onPress={validateOtp}
            variant="primary">
            {t("buttons.next")}
          </StyledButton>
        </>
      )}
    </View>
  );
};
