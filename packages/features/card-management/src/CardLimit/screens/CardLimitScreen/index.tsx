import { SimpleSlider, StyledButton, StyledSelect, StyledText, View } from "@aurora/components";
import { useState } from "react";
import { SelectedCardHeader } from "@aurora/blocks";
import { FieldGroup } from "@aurora/blocks/src/Form/FieldGroup";
import { CardType } from "@metroid/types";
import { getCurrencySymbol } from "@aurora/utils";
import { useTranslation } from "react-i18next";

export const CardLimit = ({
  selectedCard,
  onSubmit,
  isPending,
}: {
  selectedCard: CardType;
  onSubmit: (value: number, limitType: string) => void;
  isPending: boolean;
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedLimit, setSelectedLimit] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  const onSelectLimit = (limit: string) => {
    setSelectedLimit(limit);
    setSliderValue(0);
  };

  let customCardLimits: { label: string; value: string; sliderMax?: number }[] = [
    {
      label: "Card MOTO/E-commerce day limit",
      value: "LMTP0111",
      sliderMax: 4000,
    },
    {
      label: "Card MOTO/E-commerce monthly limit",
      value: "LMTP0112",
      sliderMax: 10000,
    },
  ];

  const sliderMax = customCardLimits.find(item => item.value === selectedLimit)?.sliderMax;
  const limitname = customCardLimits.find(item => item.value === selectedLimit)?.label;
  return (
    <View flex={1} justifyContent="space-between">
      <View marginTop="$m">
        <SelectedCardHeader />
        <StyledText variant="Headingxl" color="$neutral800" marginVertical="$s">
          {t("titles.limit-tracker")}
        </StyledText>
        <StyledText variant="Bodysm" color="$neutral800">
          {t("titles.limit-inquiry")}
        </StyledText>
        <StyledSelect
          items={customCardLimits}
          placeHolderText={t("placeholders.select-limit")}
          value={selectedLimit}
          onSelect={onSelectLimit}
        />
        <View flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="$m">
          <View mt="$m" flex={5 / 6} marginHorizontal="$xs" alignItems="center">
            <SimpleSlider
              key={selectedLimit}
              alignSelf="center"
              width="100%"
              value={[sliderValue]}
              max={sliderMax}
              size="$6"
              onValueChange={value => setSliderValue(value[0])}
            />
          </View>
          <View flex={1 / 6} position="absolute" right={0} top={-15}>
            <StyledText variant="BodySemiBoldml" col="$neutral800" mt="$ml" marginBottom="$xs">
              {sliderValue}
              {getCurrencySymbol(selectedCard.currencyName)}
            </StyledText>
          </View>
        </View>
        <StyledText variant="Bodysm" color="$neutral800" marginTop="$ml" marginBottom="$xs">
          {t("inputs.enter-amount")}
        </StyledText>
        <FieldGroup
          value={sliderValue.toString()}
          onChange={value => {
            const numericValue = Number(value);
            if (!isNaN(numericValue) && sliderMax !== undefined && numericValue <= sliderMax) {
              setSliderValue(Number(value));
              setError("");
            } else setError(`Max for ${limitname} is ${sliderMax}`);
          }}
          error={error}
          placeholder="0,0 USD"
          maxLength={(sliderMax ?? 0).toString().length}
        />
      </View>
      <StyledButton
        variant="primary"
        onPress={() => onSubmit(sliderValue, selectedLimit)}
        isLoading={isPending}
        disabled={isPending || selectedLimit === ""}>
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
