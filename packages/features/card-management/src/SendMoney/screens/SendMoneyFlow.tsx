import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { StatusView, Verification } from "@aurora/blocks";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { SendMoney } from "./SendMoneyScreen";
import { useSendMoneyMutation } from "../hooks/useSendMoneyMutation";
import { useCardholderNameMutation } from "../hooks/useGetCardholderNameMutation";
import { SelectedCardPreview } from "./SelectedCardPreviewScreen";
import { CardType } from "@metroid/types";
import { useGetCardsQuery } from "@metroid/hooks";
import { getCurrencyCode } from "@aurora/utils";

type Props = { returnBackHandler?: () => void };

export const SendMoneyFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const toCardRef = useRef<CardType | null>(null);
  const amountRef = useRef<string>("");
  const toCardNumber = useRef<string>("");

  const { data: cards } = useGetCardsQuery();
  const selectedCard = useSelectedCard();
  console.log("selectedCard", selectedCard);

  if (!selectedCard) {
    return null;
  }

  const onNextScreen = () => {
    if (currentScreenIndex === ReportCardFlowScreens.length - 1) {
      returnBackHandler?.();
      return;
    }
    const nextIndex = currentScreenIndex + 1;
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setCurrentScreenIndex(nextIndex);
  };

  const {
    mutate: requestOTP,
    isPending: requestOtpPending,
    data: requestOtpData,
  } = useRequestOtpMutation({
    onSuccess: () => onNextScreen(),
    onError: error => console.log("error", error),
  });

  const { mutate: sendMoney, isPending: sendMoneyIsPending } = useSendMoneyMutation({
    onSuccess: () => onNextScreen(),
    onError: error => console.log("error", error),
  });

  const {
    mutateAsync: fetchCardHolderName,
    data: cardholderNameData,
    isPending: cardholderNameIsPending,
  } = useCardholderNameMutation({
    onSuccess: () => {
      onNextScreen();
    },
    onError(error) {},
  });

  const firstStep = async ({ amount, cardNumber }: { amount: string; cardNumber: string }) => {
    amountRef.current = amount;
    toCardNumber.current = cardNumber;
    await fetchCardHolderName({ cardNumber });
    onNextScreen();
  };

  const ReportCardFlowScreens = [
    {
      title: "Send Money",
      render: (
        <SendMoney
          cardNumber={selectedCard.cardNumber.slice(-4)}
          cardCurrency={selectedCard.currencyName}
          onSubmit={firstStep}
          isPending={cardholderNameIsPending}
        />
      ),
    },
    {
      title: "Preview",
      render: (
        <SelectedCardPreview
          fromCardNumber={selectedCard.cardNumber}
          toCardNumber={toCardRef.current && toCardRef.current.cardNumber}
          amount={amountRef.current}
          cardholderName={cardholderNameData?.customerName}
          onSubmit={requestOTP}
          isPending={requestOtpPending}
        />
      ),
    },
    {
      title: "Verification",
      render: (
        <Verification
          type={requestOtpData?.data.email ? "email" : "mobile"}
          credential={requestOtpData?.data.email ?? requestOtpData?.data.phoneNumber}
          onSubmit={otp => {
            console.log({
              paymentAmount: amountRef.current,
              currencyCode: getCurrencyCode(selectedCard.currencyName),
              beneficiaryCardNumber: toCardNumber.current,
              payerCardId: toCardRef.current?.id as string,
              otp,
            });

            sendMoney({
              paymentAmount: amountRef.current,
              currencyCode: getCurrencyCode(selectedCard.currencyName),
              beneficiaryCardNumber: toCardNumber.current,
              payerCardId: selectedCard?.id as string,
              otp,
            });
          }}
          isPending={sendMoneyIsPending}
        />
      ),
    },
    {
      title: "StatusView",
      render: <StatusView onSubmit={onNextScreen} statusTitle={`Card Reported Successfully`} />,
    },
  ];

  return (
    <DialogFlow
      returnBackHandler={returnBackHandler}
      screensFlow={ReportCardFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
    />
  );
};
