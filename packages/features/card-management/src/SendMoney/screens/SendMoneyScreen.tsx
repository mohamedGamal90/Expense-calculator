import { FieldGroup } from "@aurora/blocks";
import { Form, Input, StyledButton, StyledText, TextInput, View } from "@aurora/components";
import { useSelectedCard } from "@metroid/store";
import { useState } from "react";

type Props = {
  isPending: boolean;
  onSubmit: (values: { cardNumber: string }) => void;
};
export function SendMoney({ onSubmit, isPending }: Props) {
  const selectedCard = useSelectedCard();
  const [cardNumber, setCardNumber] = useState("");

  return (
    <View flex={1}>
      <View paddingVertical="$ml" gap="$space.m">
        <StyledText variant="Headingxl">From:</StyledText>
        <StyledText variant="BodymL">
          Card ending in {selectedCard?.cardNumber.slice(-4)}
        </StyledText>
      </View>
      <View gap="$m">
        <StyledText variant="Headingxl">To:</StyledText>
        <FieldGroup
          defaultValue="4424410044532050"
          value={cardNumber}
          onChange={value => {
            setCardNumber(value as string);
          }}
          maxLength={16}
          iconRight="card"
          placeholder="1234 1234 1234 1234"
        />
      </View>
      <StyledButton
        disabled={!cardNumber || cardNumber.length < 16}
        isLoading={isPending}
        onPress={() => {
          onSubmit({
            cardNumber: cardNumber,
          });
        }}
        marginTop="$auto">
        Next
      </StyledButton>
    </View>
  );
}
