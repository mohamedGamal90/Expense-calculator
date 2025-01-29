import { SelectedCardHeader } from "@aurora/blocks";
import {
  View,
  StyledText,
  RadioGroup,
  StyledButton,
  RadioGroupItemWithLabel,
  getTokens,
} from "@aurora/components";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { useTranslation } from "react-i18next";

export const ReportCard = ({
  onSubmit,
  isPending,
}: {
  onSubmit: () => void;
  isPending: boolean;
}) => {
  const { t } = useTranslation();
  const { color } = getTokens();
  const [value, setValue] = useState<string | undefined>();

  return (
    <View flex={1} justifyContent="space-between">
      <View>
        <SelectedCardHeader />
        <StyledText marginTop={"$ml"} variant="Headingxl" color={"$neutral800"}>
          {t("titles.report-card-header")}
        </StyledText>
        <RadioGroup
          aria-labelledby="Select one item"
          defaultValue="3"
          name="form"
          native
          value={value}
          onPress={(event: GestureResponderEvent) => {
            const target = event.target as unknown as HTMLInputElement;
            setValue(target.value);
          }}
          accentColor={color.primary800.val}>
          <RadioGroupItemWithLabel updateValue={setValue} value="Lost" label={t("inputs.lost")} />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel
            updateValue={setValue}
            value="Stolen"
            label={t("inputs.stolen")}
          />
          <View height={1} backgroundColor={"$secondary100"} />

          <RadioGroupItemWithLabel updateValue={setValue} value="ATM" label={t("inputs.atm")} />
        </RadioGroup>
      </View>
      <StyledButton
        isLoading={isPending}
        bottom={1}
        disabled={!value}
        onPress={onSubmit}
        variant="primary">
        {t("buttons.report-card")}
      </StyledButton>
    </View>
  );
};
