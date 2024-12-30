import { StyledButton, StyledText, View } from "@aurora/components";
import { useState } from "react";
import { SelectedCardHeader } from "@aurora/blocks";
import { FieldGroup } from "@aurora/blocks/src/Form/FieldGroup";
import { useTranslation } from "react-i18next";

export const CardLimit = ({
  cardNumber,
  onSubmit,
  isPending,
}: {
  cardNumber: string;
  cardCurrency: string;
  onSubmit: (value: number) => void;
  isPending: boolean;
}) => {
  const [sliderValue, setSliderValue] = useState(100);
  const { t } = useTranslation();

  return (
    <View flex={1} justifyContent="space-between">
      <View marginTop="$m">
        <SelectedCardHeader cardNumber={cardNumber} />
        <StyledText variant="Headingxl" color={"$neutral800"} marginVertical="$s">
          {t("titles.limit-tracker")}
        </StyledText>
        <StyledText variant="Bodysm" color={"$neutral800"}>
          {t("titles.limit-inquiry")}
        </StyledText>
        {/* <DateSelection /> */}
        {/* <View flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="$m">
          <View flex={5 / 6} marginHorizontal="$xs" alignItems="center">
            <SimpleSlider
              alignSelf="center"
              width="100%"
              value={[sliderValue]}
              max={1000}
              size="$6"
              onValueChange={value => setSliderValue(value[0])}
            />
          </View>
          <View flex={1 / 6} position="absolute" right={0} top={-33}>
            <StyledText
              variant="BodySemiBoldml"
              color={"$neutral800"}
              marginTop="$ml"
              marginBottom="$xs">
              {sliderValue} {cardCurrency}
            </StyledText>
          </View>
        </View> */}
        <StyledText variant="Bodysm" color={"$neutral800"} marginTop="$ml" marginBottom="$xs">
          {t("inputs.enter-amount")}
        </StyledText>
        <FieldGroup
          onChange={value => {
            if (!isNaN(Number(value))) setSliderValue(Number(value));
          }}
          placeholder="0,0 USD"
        />
      </View>
      <StyledButton
        variant="primary"
        onPress={() => onSubmit(sliderValue)}
        isLoading={isPending}
        disabled={isPending}>
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
