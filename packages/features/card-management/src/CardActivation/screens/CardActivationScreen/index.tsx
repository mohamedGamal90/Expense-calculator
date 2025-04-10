import { SelectedCardHeader } from "@aurora/blocks";
import { MappingList, StyledButton, StyledText, View } from "@aurora/components";
import { CardType } from "@metroid/types";
import { Icon } from "@aurora/icons";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  selectedCard: CardType;
  onSubmit: () => void;
  isPending?: boolean;
  activationEnabled: boolean;
};

export const CardActivation = ({ selectedCard, onSubmit, isPending, activationEnabled }: Props) => {
  const { t } = useTranslation();
  const details = [
    {
      id: 1,
      title: t("titles.cardholder-name"),
      value: selectedCard.cardholderName,
    },
    {
      id: 2,
      title: t("titles.status"),
      value:
        selectedCard.statusName === "VALID CARD"
          ? t("cardDetails.active")
          : selectedCard.statusName,
    },
    {
      id: 3,
      title: t("titles.card-number"),
      value: selectedCard.cardNumber.replace(/(.{4})(?=.)/g, "$1 "),
    },
    {
      id: 4,
      title: t("titles.expiry-date"),
      value: selectedCard.expirDate && selectedCard.expirDate.replace(".20", "/"),
    },
  ];

  const renderItem = useCallback(
    (item: (typeof details)[0]) => (
      <View fd="row" gap="$s" width="100%" jc="space-between" alignItems="center">
        {item.value && (
          <>
            <StyledText variant="BodyBoldml">{item.title}</StyledText>
            <StyledText variant="BodymL">{item.value}</StyledText>
          </>
        )}
      </View>
    ),
    [],
  );

  return (
    <View flex={1} paddingTop="$m">
      <SelectedCardHeader />

      <View flexDirection="row" gap={"$s"} marginVertical={"$m"} alignItems="center">
        <Icon name="details-icon" />
        <StyledText variant="Headingl">{t("titles.details")}</StyledText>
      </View>

      <View flex={1} gap="$l" marginTop="$s">
        <MappingList data={details} renderItem={renderItem} />
      </View>

      <StyledButton isLoading={isPending} bottom={1} onPress={onSubmit} variant="primary">
        {activationEnabled ? t("buttons.activate") : t("buttons.deactivate")}
      </StyledButton>
    </View>
  );
};
