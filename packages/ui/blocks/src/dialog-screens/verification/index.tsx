import { StyledButton, StyledText, View } from "@aurora/components";
import { OTPInput } from "input-otp";
import { Icon } from "@aurora/icons";
import { useState } from "react";

const CELL_COUNT = 4;

export const Verification = ({
  onSubmit,
  type,
  crediential,
  isPending,
}: {
  onSubmit: (otp: string) => void;
  type: "mobile" | "email";
  crediential: string | undefined;
  isPending: boolean;
}) => {
  const [value, setValue] = useState("");
  const verifyObject: { icon: "mobile" | "email"; txt: string; iconTxt: JSX.Element } = (() => {
    switch (type) {
      case "mobile":
        return {
          icon: "mobile",
          txt: "Verify your phone number",
          iconTxt: (
            <>
              <StyledText variant="Bodysm" color="$neutral800">
                Phone
              </StyledText>
              <StyledText variant="Bodysm" color="$neutral800">
                Number
              </StyledText>
            </>
          ),
        };
      case "email":
        return {
          icon: "email",
          txt: "Verify your email address",
          iconTxt: (
            <StyledText variant="Bodysm" color="$neutral800">
              Email
            </StyledText>
          ),
        };
    }
  })();

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
              <Icon name={verifyObject.icon} color="#ffffff" />
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
              <Icon name={"tick-circle"} color="#B0AEB2" />
            </View>
            <StyledText variant="Bodysm" color="$neutral800">
              Success
            </StyledText>
          </View>
        </View>
        <View flexDirection="row" gap="$ml">
          <Icon name={verifyObject.icon} color="#414042" />
          <StyledText variant="Headingxl" color="$neutral800">
            {verifyObject.txt}
          </StyledText>
        </View>
        <View marginLeft="$2xl" marginTop="$base">
          <StyledText variant="BodymL" color="$neutral800" marginBottom="$s">
            We sent a 4 digit code to:
          </StyledText>
          <StyledText variant="BodymL" color="$neutral800" marginBottom="$l">
            {crediential}
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
        </View>
      </View>
      <StyledButton
        isLoading={isPending}
        disabled={value.length < 4 || isPending}
        onPress={() => onSubmit(value)}
        variant="primary">
        Next
      </StyledButton>
    </View>
  );
};
