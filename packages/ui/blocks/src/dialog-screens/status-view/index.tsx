import { StyledButton, StyledText, View } from "@aurora/components";
import LottieView from "lottie-react-native";

export const StatusView = ({
  onSubmit,
  statusTitle,
}: {
  onSubmit: () => void;
  statusTitle: string;
}) => {
  return (
    <View flex={1} justifyContent="space-between">
      <View flex={1} alignItems="center" paddingTop={"$xl"} gap={"$xl"}>
        <View>
          <LottieView source={require("./Success.json")} autoPlay loop />
        </View>
        <StyledText variant="Heading2xl" color={"$secondary900"}>
          {statusTitle}
        </StyledText>
      </View>
      <StyledButton variant="primary" onPress={onSubmit}>
        Back To Home
      </StyledButton>
    </View>
  );
};
