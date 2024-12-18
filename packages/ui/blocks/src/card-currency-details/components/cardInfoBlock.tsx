import { StyledText, View } from "@aurora/components";
import { Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
type Props = { title: string; children: JSX.Element };
export const CardInfoBlock = ({ title, children }: Props) => (
  <View
    alignItems="center"
    justifyContent="space-between"
    marginHorizontal={screenWidth > 600 ? "$ml" : "$s"}>
    <StyledText
      variant={screenWidth > 600 ? "BodySemiBoldml" : "BodySemiBolds"}
      color={"$secondary900"}>
      {title}
    </StyledText>
    {children}
  </View>
);
