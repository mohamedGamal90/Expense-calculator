import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { useTranslation } from "react-i18next";
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
}) => {
  const { t } = useTranslation();
  return (
    <View f={1} $md={{ mih: 500 }} jc="space-between">
      <View flex={1} alignItems="center" paddingTop="$xl" gap="$xl">
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
          <StyledText mb={"base"} variant="Heading2xl" color={"$secondary900"}>
            {t(`server-error.${statusTitle}`)}
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
        <StyledButton mt="$2xl" variant="primary" onPress={onSubmit}>
          Back To Home
        </StyledButton>
      )}
    </View>
  );
};
