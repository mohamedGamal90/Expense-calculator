import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import LottieView from "lottie-react-native";

export const StatusView = ({
  onSubmit,
  statusTitle,
  status,
  singleFlow,
}: {
  onSubmit: () => void;
  statusTitle?: string;
  status?: "success" | "error" | "pending";
  singleFlow?: boolean;
}) => (
  <View flex={1} justifyContent="space-between">
    <View flex={1} alignItems="center" paddingTop={"$xl"} gap={"$xl"}>
      <View>
        <LottieView
          source={
            status === "success"
              ? require("./success.json")
              : status === "error"
                ? require("./error.json")
                : require("./pending.json")
          }
          autoPlay
          loop
        />
      </View>
      {statusTitle && (
        <StyledText variant="Heading2xl" color={"$secondary900"}>
          {statusTitle}
        </StyledText>
      )}
    </View>
    {singleFlow ? (
      <Dialog.Close asChild>
        <StyledButton variant="primary" onPress={onSubmit}>
          Back To Home
        </StyledButton>
      </Dialog.Close>
    ) : (
      <StyledButton variant="primary" onPress={onSubmit}>
        Back To Home
      </StyledButton>
    )}
  </View>
);
