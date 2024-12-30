import { View, StyledText, StyledButton } from "@aurora/components";
import { useTranslation } from "react-i18next";
import { Icon } from "@aurora/icons"; // Adjust this import according to your project structure

export const TopUpConfirmation = ({
  onSubmit,
  isPending,
  fromCardNumber,
  toCardNumber,
  amount,
}: {
  onSubmit: () => void;
  isPending: boolean;
  fromCardNumber: string;
  toCardNumber: string;
  amount: string;
}) => {
  const { t } = useTranslation();

  return (
    <View flex={1} justifyContent="space-between">
      <View marginVertical="$l">
        <View
          backgroundColor="$secondary100"
          gap="$ml"
          padding="$ml"
          marginBottom="$xl"
          borderRadius="$sm"
          paddingBottom="$3xl">
          <StyledText variant="Headingxl" textAlign="center" color="$secondary800">
            {t("transfer.from")}
          </StyledText>
          <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" gap="$s">
            <Icon name={"card"} />
            <StyledText variant="BodymL" color="$secondary800">
              {t("transfer.cardNumber")}
            </StyledText>
            <StyledText variant="BodymL" color="$secondary800">
              {fromCardNumber}
            </StyledText>
          </View>
        </View>
        <View
          position="absolute"
          alignItems="center"
          borderRadius="$full"
          right={"45%"}
          top={140}
          zIndex={20}
          backgroundColor="$white"
          shadowColor="$secondary400"
          shadowRadius={4}
          padding="$base">
          <Icon name={"arrow-full-down"} />
        </View>
        <View
          backgroundColor="$secondary100"
          gap="$ml"
          padding="$ml"
          borderRadius="$sm"
          paddingBottom="$3xl">
          <StyledText variant="Headingxl" textAlign="center" color="$secondary800">
            {t("transfer.to")}
          </StyledText>
          <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" gap="$s">
            <Icon name={"card"} />
            <StyledText variant="BodymL" color="$secondary800">
              {t("transfer.cardNumber")}
            </StyledText>
            <StyledText variant="BodymL" color="$secondary800">
              {toCardNumber}
            </StyledText>
          </View>
        </View>
        <View marginTop="$xl" flexDirection="row" justifyContent="space-between">
          <StyledText variant="Headingxl" color="$neutral800">
            {t("transfer.amount")}
          </StyledText>
          <StyledText variant="Headingxl" color="$neutral800">
            {amount}
          </StyledText>
        </View>
      </View>
      <StyledButton isLoading={isPending} onPress={onSubmit} variant="primary">
        {t("buttons.send")}
      </StyledButton>
    </View>
  );
};
