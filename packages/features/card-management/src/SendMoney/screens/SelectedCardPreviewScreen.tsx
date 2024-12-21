import { StyledText, View } from "@aurora/components";
import { useState } from "react";
import { Image } from "react-native";
// import { useTranslation } from "react-i18next";

type Props = {
  cardholderName?: string;
  onSubmit: () => void;
  isPending?: boolean;
};
export function SelectedCardPreview({ cardholderName, onSubmit }: Props) {
  const [amount, setAmount] = useState("");
  // const { t } = useTranslation();
  return (
    <View flex={1}>
      <StyledText variant="Headingxl" color={"$neutral800"}>
        {/* {t("cardManagement.cardSelected")} */}
        Card Selected
      </StyledText>
      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="$s"
        marginVertical="$m">
        <View height={200} width={300} backgroundColor={"$primary500"}></View>
        {/* <Image style={{ width: 80, height: 50 }} source={require("./cardImage.png")} /> */}
      </View>
      <View flexDirection="row">
        <View>
          <StyledText variant="Headingl">Details</StyledText>
        </View>
        <View>
          <StyledText>Cardholder Name:</StyledText>
          <StyledText>{cardholderName}</StyledText>
        </View>
      </View>
    </View>
  );
}
