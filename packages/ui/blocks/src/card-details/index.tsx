import { StyledText, View } from "@aurora/components";

function CopyButton() {
  return (
    <StyledText color="$brand500" textDecorationLine="underline">
      Copy
    </StyledText>
  );
}

export function CardDetails() {
  return (
    <View backgroundColor={"white"}>
      <View alignItems="center" justifyContent="center" paddingVertical="$m">
        <StyledText>Card Details</StyledText>
      </View>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingVertical="$m"
        paddingHorizontal="$l">
        <View>
          <StyledText>Cardholder Name</StyledText>
          <StyledText>John Doe</StyledText>
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
          <StyledText>Card Number</StyledText>
          <StyledText>1234 1234 1234 1234</StyledText>
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
          <StyledText>Expiry Date</StyledText>
          <StyledText>12/28</StyledText>
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
          <StyledText>CVV</StyledText>
          <StyledText>123</StyledText>
        </View>
        <CopyButton />
      </View>
    </View>
  );
}
