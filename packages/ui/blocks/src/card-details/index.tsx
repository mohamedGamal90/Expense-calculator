import React from "react";
import { StyledText, View } from "@aurora/components";

function CopyButton() {
  return (
    <StyledText color="$brand500" textDecorationLine="underline" variant="bodyM">
      Copy
    </StyledText>
  );
}

export function CardDetails() {
  return (
    <View backgroundColor={"white"}>
      <View alignItems="center" justifyContent="center" paddingVertical="$m">
        <StyledText variant="bodyL">Card Details</StyledText>
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$m"
        paddingHorizontal="$l">
        <View>
          <StyledText variant="bodyL">Cardholder Name</StyledText>
          <StyledText variant="contentRegularM">John Doe</StyledText>
        </View>
        <CopyButton />
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$m"
        paddingHorizontal="$l">
        <View>
          <StyledText variant="bodyL">Card Number</StyledText>
          <StyledText variant="contentRegularM">1234 1234 1234 1234</StyledText>
        </View>
        <CopyButton />
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$m"
        paddingHorizontal="$l">
        <View>
          <StyledText variant="bodyL">Expiry Date</StyledText>
          <StyledText variant="contentRegularM">12/28</StyledText>
        </View>
        <CopyButton />
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$m"
        paddingHorizontal="$l">
        <View>
          <StyledText variant="bodyL">CVV</StyledText>
          <StyledText variant="contentRegularM">123</StyledText>
        </View>
        <CopyButton />
      </View>
    </View>
  );
}
