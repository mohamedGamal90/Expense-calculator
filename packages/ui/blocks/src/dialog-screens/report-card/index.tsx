import {
  View,
  StyledText,
  RadioGroup,
  StyledButton,
  RadioGroupItemWithLabel,
  Image,
  getTokens,
} from "@aurora/components";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";

export const ReportCard = ({
  onSubmit,
  isPending,
  cardNumber,
}: {
  onSubmit: () => void;
  isPending: boolean;
  cardNumber: string;
}) => {
  const { color } = getTokens();
  const [value, setValue] = useState<string | undefined>();
  return (
    <View flex={1} justifyContent="space-between">
      <View>
        <StyledText variant="Headingxl" color={"$neutral800"}>
          Card selected
        </StyledText>
        <View flexDirection="row" alignItems="center" gap="$s" marginVertical="$m">
          <Image style={{ width: 80, height: 50 }} source={require("../../cardImage.png")} />
          <StyledText
            variant="Bodym"
            color={"$neutral800"}>{`Card end with **** ${cardNumber}`}</StyledText>
        </View>
        <StyledText marginTop={"$ml"} variant="Headingxl" color={"$neutral800"}>
          What happened to your card?
        </StyledText>
        <RadioGroup
          aria-labelledby="Select one item"
          defaultValue="3"
          name="form"
          native
          value={value}
          onPress={(event: GestureResponderEvent) => {
            const target = event.target as unknown as HTMLInputElement;
            if (target.value) setValue(target.value);
          }}
          accentColor={color.primary800.val}>
          <RadioGroupItemWithLabel value="Lost" label="Card Lost" />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel value="Stolen" label="Card Stolen" />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel value="ATM" label="ATM took my card" />
        </RadioGroup>
      </View>
      <StyledButton
        isLoading={isPending}
        bottom={1}
        disabled={!value || isPending}
        onPress={onSubmit}
        variant="primary">
        Report card
      </StyledButton>
    </View>
  );
};
