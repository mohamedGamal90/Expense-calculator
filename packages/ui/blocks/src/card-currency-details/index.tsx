import { StyledText, View } from "@aurora/components";
import { CardInfoBlock } from "./components/cardInfoBlock";
import { Dimensions } from "react-native";
import { getCurrencySymbol } from "@aurora/utils";
import { useSelectedCard } from "@metroid/store";
import { t } from "i18next";

const { width: screenWidth } = Dimensions.get("window");

function CardCurrencyDetailsLoading() {
  return (
    <View flexDirection="row" justifyContent="center" margin={screenWidth > 600 ? "$ml" : "$sm"}>
      <CardInfoBlock title={t("cardDetails.yourBalance")}>
        <View width={80} height={24} backgroundColor="$secondary100" borderRadius="$sm" />
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={t("cardDetails.status")}>
        <View width={60} height={24} backgroundColor="$secondary100" borderRadius="$sm" />
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={t("cardDetails.cardCurrency")}>
        <View width={70} height={24} backgroundColor="$secondary100" borderRadius="$sm" />
      </CardInfoBlock>
    </View>
  );
}

export const CardCurrencyDetails = () => {
  const selectedCard = useSelectedCard();

  if (!selectedCard) {
    return <CardCurrencyDetailsLoading />;
  }

  const cardStatus =
    selectedCard.statusName === "VALID CARD" ? t("cardDetails.active") : t("cardDetails.inactive");

  return (
    <View flexDirection="row" justifyContent="center">
      <CardInfoBlock title={t("cardDetails.yourBalance")}>
        <StyledText
          $sm={{
            variant: "BodySemiBoldml",
          }}
          paddingVertical={"$xs"}
          color={"$secondary900"}>
          {`${getCurrencySymbol(selectedCard.currencyName)} ${selectedCard.availableBalance}`}
        </StyledText>
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$sm"} />
      <CardInfoBlock title={t("cardDetails.status")}>
        <View
          backgroundColor={selectedCard.statusName === "VALID CARD" ? "$success50" : "$error100"}
          paddingHorizontal={"$sm"}
          paddingVertical={"$s"}
          alignItems="center"
          justifyContent="center"
          borderRadius={"$sm"}>
          <StyledText
            $sm={{
              variant: "BodySemiBolds",
            }}
            variant="BodySemiBoldm"
            color={selectedCard.statusName === "VALID CARD" ? "$success600" : "$error500"}>
            {cardStatus}
          </StyledText>
        </View>
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$sm"} />
      <CardInfoBlock title={t("cardDetails.cardCurrency")}>
        <StyledText
          $sm={{
            variant: "BodySemiBolds",
          }}
          variant="BodySemiBoldm"
          paddingVertical={"$xs"}
          color={"$secondary900"}>
          {t("currencies." + selectedCard.currencyName)}
        </StyledText>
      </CardInfoBlock>
    </View>
  );
};
