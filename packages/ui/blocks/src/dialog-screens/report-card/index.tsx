import {
  View,
  StyledText,
  RadioGroup,
  StyledButton,
  RadioGroupItemWithLabel,
  config,
} from "@aurora/components";
import { useState } from "react";

export const ReportCard = ({ onSubmit }: { onSubmit: () => void }) => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <View flex={1} justifyContent="space-between">
      <View>
        <StyledText marginTop={"$ml"} variant="Headingxl" color={"$neutral800"}>
          What happened to your card?
        </StyledText>
        <RadioGroup
          aria-labelledby="Select one item"
          defaultValue="3"
          name="form"
          native
          value={value}
          onPress={({ target }) => {
            if (target.value) setValue(target.value);
          }}
          accentColor={config.tokens.color.primary800.val}>
          <RadioGroupItemWithLabel value="Lost" label="Card Lost" />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel value="Stolen" label="Card Stolen" />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel value="ATM" label="ATM took my card" />
        </RadioGroup>
      </View>
      <StyledButton bottom={1} disabled={!value} onPress={onSubmit} variant="primary">
        Report card
      </StyledButton>
    </View>
  );
};
