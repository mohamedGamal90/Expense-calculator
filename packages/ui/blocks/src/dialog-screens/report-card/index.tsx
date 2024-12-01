import {
  View,
  StyledText,
  RadioGroup,
  StyledButton,
  RadioGroupItemWithLabel,
  Dialog,
  config,
} from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useState } from "react";

export const ReportCard = ({ onSubmit }: { onSubmit: () => void }) => {
  const [value, setValue] = useState<string | undefined>();
  return (
    <View flex={1} justifyContent="space-between">
      <View>
        <Dialog.Title alignSelf="center">
          <StyledText
            textAlign="center"
            variant="Heading2xl"
            color={"$secondary800"}
          >
            Report Card
          </StyledText>
        </Dialog.Title>
        <StyledButton
          position="absolute"
          variant="iconBtn"
          backgroundColor={"$white"}
          borderColor={"$white"}
          width={40}
          height={26}
          left={0}
          top={-4}
        >
          <Icon name={"arrow-left"} width={26} height={26} color="#000000" />
        </StyledButton>
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
          accentColor={config.tokens.color.primary800.val}
        >
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
