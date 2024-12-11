import { StyledText, View } from "@aurora/components";
import { CardInfoBlock } from "./components/cardInfoBlock";
import { Dimensions } from "react-native";
import { CardType } from "@aurora/home/src/types/cardType";
import { getCurrencyFullName, getCurrencySymbol } from "@aurora/utils";

const { width: screenWidth } = Dimensions.get("window");
export const CardCurrencyDetails = ({ card }: { card: CardType }) => {
  const cardStatus = card.statusName === "VALID CARD" ? "Active" : "UnActive";
  return (
    <View flexDirection="row" justifyContent="center" margin={screenWidth > 600 ? "$ml" : "$sm"}>
      <CardInfoBlock title={"Your Balance"}>
        <StyledText
          variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBoldsm"}
          paddingVertical={"$xs"}
          color={"$secondary900"}>
          {`${getCurrencySymbol(card.currencyName)} ${card.availableBalance}`}
        </StyledText>
      </CardInfoBlock>
      <View width={1} height={68} backgroundColor={"$secondary100"} marginHorizontal={"$base"} />
      <CardInfoBlock title={"Status"}>
        <View
          backgroundColor={card.statusName === "VALID CARD" ? "$success50" : "$error100"}
          paddingHorizontal={"$sm"}
          paddingVertical={"$s"}
          borderRadius={"$sm"}>
          <StyledText
            variant={screenWidth > 600 ? "Bodym" : "Bodys"}
            color={card.statusName === "VALID CARD" ? "$success600" : "$error500"}>
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
          {getCurrencyFullName(card.currencyName)}
        </StyledText>
      </CardInfoBlock>
    </View>
  );
};
