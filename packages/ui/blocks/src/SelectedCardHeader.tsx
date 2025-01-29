import { StyledText, View } from "@aurora/components";
import { getCardImage } from "@aurora/utils";
import { useSelectedCard } from "@metroid/store";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

export const SelectedCardHeader = () => {
  const { t } = useTranslation();
  const selectedCard = useSelectedCard();

  if (!selectedCard) return null;
  return (
    <>
      <StyledText variant="Headingxl" color="$neutral800">
        {t("titles.cardSelected")}
      </StyledText>
      <View flexDirection="row" alignItems="center" gap="$s" marginVertical="$m">
        <Image
          style={{ width: 80, height: 50 }}
          source={getCardImage(selectedCard.productNumber)}
        />
        <StyledText
          variant="Bodym"
          col="$neutral800">{`${t("cardManagement.cardEnding")} ${selectedCard.cardNumber.slice(-4)}`}</StyledText>
      </View>
    </>
  );
};
