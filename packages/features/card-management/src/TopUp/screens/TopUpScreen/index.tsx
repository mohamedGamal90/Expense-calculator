import { FieldGroup, SelectedCardHeader } from "@aurora/blocks";
import { StyledSelect, StyledButton, StyledText, View } from "@aurora/components";
import { CardType } from "@metroid/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const TopUp = ({
  cards,
  onSubmit,
}: {
  cards: CardType[] | undefined;
  onSubmit: (selectedCard: string, amount: string) => void;
}) => {
  const [selectedCardID, setselectedCardID] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const { t } = useTranslation();

  const filteredCards = cards
    ?.filter(card => card.status === "Valid card")
    ?.map(item => ({
      label: item.cardNumber,
      value: item.id,
    }));

  return (
    <View flex={1} paddingTop="$m" justifyContent="space-between">
      <View>
        <SelectedCardHeader />
        <StyledSelect
          items={filteredCards!}
          placeHolderText={
            filteredCards?.length === 0
              ? t("placeholders.select-card-empty")
              : t("placeholders.select-card")
          }
          value={selectedCardID}
          onSelect={value => setselectedCardID(value)}
        />
        <View mt="$m">
          <StyledText marginVertical="$m" variant="BodyBoldml" color="$neutral800">
            {t("inputs.amount-to-add")}
          </StyledText>
          <FieldGroup
            value={amount}
            onChange={value => setAmount(value as string)}
            keyboardType="numeric"
            placeholder="0,0 USD"
          />
        </View>
      </View>
      <StyledButton
        disabled={selectedCardID.length < 1 || !amount || isNaN(Number(amount))}
        onPress={() => onSubmit(selectedCardID, amount)}
        variant="primary">
        {t("buttons.next")}
      </StyledButton>
    </View>
  );
};
