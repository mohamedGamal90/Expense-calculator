import { StyledText, View } from "@aurora/components";
import { CardInfoBlock } from "./components/cardInfoBlock";
import { Dimensions } from "react-native";
import { getCurrencySymbol } from "@aurora/utils";
import { useSelectedCard } from "@metroid/store";
import { t } from "i18next";

const { width: screenWidth } = Dimensions.get("window");

function CardCurrencyDetailsLoading() {
  return (
    <View fd="row" jc="center" margin={screenWidth > 600 ? "$ml" : "$sm"}>
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
    selectedCard.statusName === "VALID CARD" ? t("cardDetails.active") : selectedCard.statusName;

  return (
    <View flexDirection="row" justifyContent="center">
      <CardInfoBlock title={t("cardDetails.yourBalance")}>
        <StyledText $sm={{ variant: "BodySemiBoldm" }} py="$xs" color="$secondary900">
          {`${getCurrencySymbol(selectedCard.currencyName)} ${selectedCard.availableBalance}`}
        </StyledText>
      </CardInfoBlock>
      <View w={1} h={68} bg="$secondary100" mx="$sm" />
      <CardInfoBlock title={t("cardDetails.status")}>
        <View
          bg={selectedCard.statusName === "VALID CARD" ? "$success50" : "$error100"}
          $sm={{ px: "$s" }}
          px="$sm"
          py="$s"
          alignItems="center"
          justifyContent="center"
          borderRadius="$sm">
          <StyledText
            $sm={{ variant: "BodySemiBolds" }}
            variant="BodySemiBoldm"
            $xs={{ width: 58 }}
            textAlign="center"
            color={selectedCard.statusName === "VALID CARD" ? "$success600" : "$error500"}>
            {cardStatus}
          </StyledText>
        </View>
      </CardInfoBlock>
      <View w={1} h={68} bg="$secondary100" mx="$sm" />
      <CardInfoBlock title={t("cardDetails.cardCurrency")}>
        <StyledText
          $sm={{ variant: "BodySemiBolds" }}
          variant="BodySemiBoldm"
          py="$xs"
          col="$secondary900">
          {t("currencies." + selectedCard.currencyName)}
        </StyledText>
      </CardInfoBlock>
    </View>
  );
};
