import { SelectedCardHeader } from "@aurora/blocks";
import { MappingList, StyledButton, StyledText, View } from "@aurora/components";
import { CardType } from "@aurora/home/src/types/cardType";
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
      title: "CardHolder Name",
      value: selectedCard.cardholderName,
    },

    {
      id: 2,
      title: "Status",
      value: selectedCard.statusName === "VALID CARD" ? "Active" : "UnActive",
    },
    {
      id: 3,
      title: "Card number",
      value: selectedCard.cardNumber.replace(/(.{4})(?=.)/g, "$1 "),
    },
    {
      id: 4,
      title: "Expiry date",
      value: selectedCard.expirDate.replace(".20", "/"),
    },
  ];

  const renderItem = useCallback((item: (typeof details)[0]) => {
    return (
      <View
        flexDirection="row"
        gap={"$s"}
        width={"100%"}
        justifyContent="space-between"
        alignItems="center">
        <StyledText variant="BodyBoldml">{item.title}</StyledText>
        <StyledText variant="BodymL">{item.value}</StyledText>
      </View>
    );
  }, []);

  return (
    <View flex={1} paddingTop="$m">
      <SelectedCardHeader cardNumber={selectedCard.cardNumber.slice(-4)} />

      <View flexDirection="row" gap={"$s"} marginVertical={"$m"} alignItems="center">
        <Icon name="details-icon" />
        <StyledText variant="Headingl">{t("titles.details")}</StyledText>
      </View>

      <View flex={1} gap="$l">
        <MappingList data={details} renderItem={renderItem} />
      </View>

      <StyledButton isLoading={isPending} bottom={1} onPress={onSubmit} variant="primary">
        {activationEnabled ? t("buttons.activate") : t("buttons.deactivate")}
      </StyledButton>
    </View>
  );
};
