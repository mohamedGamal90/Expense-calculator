import { FieldGroup, SelectedCardHeader } from "@aurora/blocks";
import { StyledButton, StyledText, View } from "@aurora/components";
import { useState } from "react";

type Props = {
  cardNumber: string;
  isPending: boolean;
  onSubmit: (values: { amount: string; cardNumber: string }) => void;
};
export function SendMoney({ onSubmit, isPending, cardNumber }: Props) {
  const [sendToCardNumber, setSendToCardNumber] = useState("");
  const [amount, setAmount] = useState<string>("");

  return (
    <View flex={1}>
      <SelectedCardHeader cardNumber={cardNumber} />
      <View gap="$m">
        <StyledText variant="Headingxl">To:</StyledText>
        <FieldGroup
          defaultValue="4424410044532050"
          value={sendToCardNumber}
          onChange={value => {
            setSendToCardNumber(value as string);
          }}
          maxLength={16}
          iconRight="card"
          placeholder="1234 1234 1234 1234"
        />
      </View>
      <View gap="$m">
        <StyledText marginVertical="$m" variant="BodyBoldml" color="$neutral800">
          Amount you want to send
        </StyledText>
        <FieldGroup
          value={amount}
          onChange={value => setAmount(value as string)}
          keyboardType="numeric"
          placeholder="0,0 USD"
        />
      </View>
      <StyledButton
        disabled={!sendToCardNumber || sendToCardNumber.length < 16 || !amount}
        isLoading={isPending}
        onPress={() => {
          onSubmit({
            cardNumber: sendToCardNumber,
            amount,
          });
        }}
        marginTop="$auto">
        Next
      </StyledButton>
    </View>
  );
}
