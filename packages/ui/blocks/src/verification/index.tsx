import { getTokens, StyledButton, StyledText, View } from "@aurora/components";
import { OTPInput } from "input-otp";
import { Icon } from "@aurora/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const CELL_COUNT = 4;

export const Verification = ({
  onSubmit,
  type = "mobile",
  credential,
  isPending,
}: {
  onSubmit: (otp: string) => void;
  credential: string | undefined;
  type?: "mobile" | "email";
  isPending: boolean;
}) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const { color } = getTokens();
  const verifyObject: { icon: "mobile" | "email"; txt: string; iconTxt: JSX.Element } = (() => {
    switch (type) {
      case "mobile":
        return {
          icon: "mobile",
          txt: t("validation.verify-phone-number"),
          iconTxt: (
            <>
              <StyledText variant="Bodysm" color="$neutral800">
                {t("inputs.phone")}
              </StyledText>
              <StyledText variant="Bodysm" color="$neutral800">
                {t("inputs.number")}
              </StyledText>
            </>
          ),
        };
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
    <View flex={1} justifyContent="space-between">
      <View>
        <View flexDirection="row" gap={"$s"} marginVertical={"$l"}>
          <View alignItems="center" gap={"$xs"}>
            <View
              width={50}
              height={50}
              backgroundColor={"$primary800"}
              borderWidth={1}
              borderColor={"$primary800"}
              borderRadius={"$full"}
              justifyContent="center"
              alignItems="center">
              <Icon name={verifyObject.icon} color={color.white.val} />
            </View>
            {verifyObject.iconTxt}
          </View>
          <View flex={1} height={2} top={25} backgroundColor={"$primary800"} borderRadius={"$s"} />
          <View alignItems="center" gap={"$xs"}>
            <View
              width={50}
              height={50}
              backgroundColor={"$secondary50"}
              borderWidth={1}
              borderColor={"$secondary300"}
              borderRadius={"$full"}
              justifyContent="center"
              alignItems="center">
              <Icon name={"tick-circle"} color={color.secondary300.val} />
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
                    borderRadius={"$s"}
                    borderWidth={2}
                    marginRight={"$m"}
                    height={40}
                    width={40}>
                    {slot.char !== null && (
                      <StyledText color="$secondary800">{slot.char}</StyledText>
                    )}
                  </View>
                ))}
              </View>
            )}
          />
          {error && (
            <StyledText variant="Bodysm" color="$error600" marginTop="$sm">
              {t("validation.otp-error-message")}
            </StyledText>
          )}
        </View>
      </View>
      <StyledButton
        isLoading={isPending}
        disabled={value.length < 4}
        onPress={validateOtp}
        variant="primary">
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
