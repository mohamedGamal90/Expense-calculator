import { SimpleSlider, StyledButton, StyledSelect, StyledText, View } from "@aurora/components";
import { useState } from "react";
import { SelectedCardHeader } from "@aurora/blocks";
import { FieldGroup } from "@aurora/blocks/src/Form/FieldGroup";
import { CardType } from "@metroid/types";
import { useGetCardLimitsQuery } from "../../hooks/useGetCardLimits";
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
  const { data, isSuccess } = useGetCardLimitsQuery(selectedCard.id);
  const { t } = useTranslation();

  const onSelectLimit = (limit: string) => {
    setSelectedLimit(limit);
    setSliderValue(0);
  };
  let customCardLimits = [{ label: "limit.description", value: "limit.limitType" }];
  if (isSuccess) {
    customCardLimits = data?.limits.map(limit => ({
      label: limit.description,
      value: limit.limitType,
    }));
  }

  const sliderMax = data?.limits.find(limit => selectedLimit === limit.limitType)?.limitValue;

  return (
    <View flex={1} justifyContent="space-between">
      <View marginTop="$m">
        <SelectedCardHeader cardNumber={selectedCard.cardNumber.slice(-4)} />
        <StyledText variant="Headingxl" color={"$neutral800"} marginVertical="$s">
          {t("titles.limit-tracker")}
        </StyledText>
        <StyledText variant="Bodysm" color={"$neutral800"}>
          {t("titles.limit-inquiry")}
        </StyledText>
        <StyledSelect
          items={customCardLimits}
          placeHolderText={t("placeholders.select-limit")}
          value={selectedLimit}
          onSelect={onSelectLimit}
        />
        <View flexDirection="row" justifyContent="space-between" alignItems="center" marginTop="$m">
          <View flex={5 / 6} marginHorizontal="$xs" alignItems="center">
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
          <View flex={1 / 6} position="absolute" right={0} top={-33}>
            <StyledText
              variant="BodySemiBoldml"
              color={"$neutral800"}
              marginTop="$ml"
              marginBottom="$xs">
              {sliderValue}
              {getCurrencySymbol(selectedCard.currencyName)}
            </StyledText>
          </View>
        </View>
        <StyledText variant="Bodysm" color={"$neutral800"} marginTop="$ml" marginBottom="$xs">
          {t("inputs.enter-amount")}
        </StyledText>
        <FieldGroup
          value={sliderValue.toString()}
          onChange={value => {
            if (!isNaN(Number(value))) setSliderValue(Number(value));
          }}
          placeholder="0,0 USD"
        />
      </View>
      <StyledButton
        variant="primary"
        onPress={() => onSubmit(sliderValue, selectedLimit)}
        isLoading={isPending}
        disabled={isPending}>
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
