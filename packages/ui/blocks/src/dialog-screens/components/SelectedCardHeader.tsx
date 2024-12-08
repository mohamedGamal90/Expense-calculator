import { StyledText, View } from "@aurora/components";
import { Image } from "react-native";

export const SelectedCardHeader = ({ cardNumber }: { cardNumber: string }) => (
  <>
    <StyledText variant="Headingxl" color={"$neutral800"}>
      Card selected
    </StyledText>
    <View flexDirection="row" alignItems="center" gap="$s" marginVertical="$m">
      <Image style={{ width: 80, height: 50 }} source={require("../../cardImage.png")} />
      <StyledText
        variant="Bodym"
        color={"$neutral800"}>{`Card end with **** ${cardNumber}`}</StyledText>
    </View>
  </>
);
