import { StyledText, View } from "@aurora/components";
import { CardInfoBlock } from "./components/cardInfoBlock";
import { Dimensions } from "react-native";
import { getCurrencyFullName, getCurrencySymbol } from "@aurora/utils";
import { useSelectedCard } from "@metroid/store";

const { width: screenWidth } = Dimensions.get("window");

function CardCurrencyDetailsLoading() {
  return (
    <View flexDirection="row" justifyContent="center" margin={screenWidth > 600 ? "$ml" : "$sm"}>
      <CardInfoBlock title={"Your Balance"}>
        <View width={80} height={24} backgroundColor="$secondary100" borderRadius="$sm" />
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={"Status"}>
        <View width={60} height={24} backgroundColor="$secondary100" borderRadius="$sm" />
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={"Card Currency"}>
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

  const cardStatus = selectedCard.statusName === "VALID CARD" ? "Active" : "UnActive";

  return (
    <View flexDirection="row" justifyContent="center" margin={screenWidth > 600 ? "$ml" : "$sm"}>
      <CardInfoBlock title={"Your Balance"}>
        <StyledText
          variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBoldsm"}
          paddingVertical={"$xs"}
          color={"$secondary900"}>
          {`${getCurrencySymbol(selectedCard.currencyName)} ${selectedCard.availableBalance}`}
        </StyledText>
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={"Status"}>
        <View
          backgroundColor={selectedCard.statusName === "VALID CARD" ? "$success50" : "$error100"}
          paddingHorizontal={"$sm"}
          paddingVertical={"$s"}
          borderRadius={"$sm"}>
          <StyledText
            variant={screenWidth > 600 ? "Bodym" : "Bodys"}
            color={selectedCard.statusName === "VALID CARD" ? "$success600" : "$error500"}>
            {cardStatus}
          </StyledText>
        </View>
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={"Card Currency"}>
        <StyledText
          paddingVertical={"$xs"}
          variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBolds"}
          color={"$secondary900"}>
          {getCurrencyFullName(selectedCard.currencyName)}
        </StyledText>
      </CardInfoBlock>
    </View>
  );
};
