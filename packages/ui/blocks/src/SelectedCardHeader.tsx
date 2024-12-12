import { StyledText, View } from "@aurora/components";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";

export const SelectedCardHeader = ({ cardNumber }: { cardNumber: string }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledText variant="Headingxl" color={"$neutral800"}>
        {t("cardManagement.cardSelected")}
      </StyledText>
      <View flexDirection="row" alignItems="center" gap="$s" marginVertical="$m">
        <Image style={{ width: 80, height: 50 }} source={require("./cardImage.png")} />
        <StyledText
          variant="Bodym"
          color={"$neutral800"}>{`${t("cardManagement.cardEnding")} ${cardNumber}`}</StyledText>
      </View>
    </>
  );
};
