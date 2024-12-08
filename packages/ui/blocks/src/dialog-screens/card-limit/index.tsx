import { Progress, StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { useState } from "react";
import { DateSelection } from "./components/DateSelectionBtn";
import { SelectedCardHeader } from "../components/SelectedCardHeader";

export const CardLimit = ({
  cardNumber,
  onSubmit,
  isPending,
}: {
  cardNumber: string;
  onSubmit: () => void;
  isPending: boolean;
}) => {
  const [progress, setProgress] = useState(20);

  return (
    <View flex={1} justifyContent="space-between">
      <View marginTop="$m">
        <SelectedCardHeader cardNumber={cardNumber} />
        <StyledText variant="Headingxl" color={"$neutral800"} marginVertical="$s">
          Limit Tracker
        </StyledText>
        <StyledText variant="Bodysm" color={"$neutral800"}>
          How do you want to limit your money?
        </StyledText>
        <DateSelection />
        <Progress size={"$6"} value={progress}>
          <Progress.Indicator animation="medium" backgroundColor={"$primary800"} />
        </Progress>
        <StyledText variant="Bodysm" color={"$neutral800"} marginTop="$ml" marginBottom="$xs">
          Enter Amount
        </StyledText>
        <TextInput keyboardType="numeric" />
      </View>
      <StyledButton variant="primary" onPress={onSubmit} isLoading={isPending} disabled={isPending}>
        Next
      </StyledButton>
    </View>
  );
};
