import { StyledButton, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";

export const TopUpConfirmation = ({
  fromCardNumber,
  toCardNumber,
  amount,
  onSubmit,
  isPending,
}: {
  fromCardNumber: string;
  toCardNumber: string | null;
  amount: string;
  onSubmit: () => void;
  isPending: boolean;
}) => {
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
            From:
          </StyledText>
          <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" gap="$s">
            <Icon name={"card"} />
            <StyledText variant="BodymL" color="$secondary800">
              Card number
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
            To:
          </StyledText>
          <View flex={1} flexDirection="row" alignItems="center" justifyContent="center" gap="$s">
            <Icon name={"card"} />
            <StyledText variant="BodymL" color="$secondary800">
              Card number
            </StyledText>
            <StyledText variant="BodymL" color="$secondary800">
              {toCardNumber}
            </StyledText>
          </View>
        </View>
        <View marginTop="$xl" flexDirection="row" justifyContent="space-between">
          <StyledText variant="Headingxl" color="$neutral800">
            Amount you will send
          </StyledText>
          <StyledText variant="Headingxl" color="$neutral800">
            {amount}
          </StyledText>
        </View>
      </View>
      <StyledButton isLoading={isPending} onPress={onSubmit} variant="primary">
        Send
      </StyledButton>
    </View>
  );
};
