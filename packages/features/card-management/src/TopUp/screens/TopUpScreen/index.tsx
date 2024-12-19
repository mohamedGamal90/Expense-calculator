import { FieldGroup, SelectedCardHeader } from "@aurora/blocks";
import { StyledSelect, StyledButton, StyledText, View } from "@aurora/components";
import { CardType } from "@aurora/home/src/types/cardType";
import { useState } from "react";

export const TopUp = ({
  cards,
  onSubmit,
  cardNumber,
}: {
  cards: CardType[] | undefined;
  onSubmit: (selectedCard: string, amount: string) => void;
  cardNumber: string;
}) => {
  const [selectedCardID, setselectedCardID] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  return (
    <View flex={1} paddingTop="$m" justifyContent="space-between">
      <View>
        <SelectedCardHeader cardNumber={cardNumber.slice(-4)} />
        <StyledSelect
          items={cards}
          placeHolderText={"Select a card"}
          value={selectedCardID}
          setValue={setselectedCardID}
        />
        <StyledText marginVertical="$m" variant="BodyBoldml" color="$neutral800">
          Amount you want to add
        </StyledText>
        <FieldGroup
          value={amount}
          onChange={value => setAmount(value as string)}
          keyboardType="numeric"
        />
      </View>
      <StyledButton
        disabled={selectedCardID.length < 1 || !amount || isNaN(Number(amount))}
        onPress={() => onSubmit(selectedCardID, amount)}
        variant="primary">
        Next
      </StyledButton>
    </View>
  );
};
