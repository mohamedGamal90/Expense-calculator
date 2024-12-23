import { FlatList } from "react-native";
import { CardType } from "@metroid/types";
import { useRef, useState } from "react";
import { DialogFlow, StatusView, Verification } from "@aurora/blocks";
import { TopUp } from "./TopUpScreen";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { TopUpConfirmation } from "./TopUpConfirmationScreen";
import { useTopUpMutation } from "../hooks/useTopUpMutation";
import { getCurrencyCode } from "@aurora/utils";
import { useGetCardsQuery } from "@metroid/hooks";
import { useSelectedCard } from "@metroid/store";

export function TopUpFlow() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const toCardRef = useRef<CardType | null>(null);
  const amountRef = useRef<string>("");
  const { data: cards } = useGetCardsQuery();
  const selectedCard = useSelectedCard();
  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: "Top up successfully",
  });

  if (!selectedCard) {
    return null;
  }

  const onNextScreen = () => {
    if (currentScreenIndex === topUpFlowScreens.length - 1) {
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
    mutateAsync: requestOTP,
    isPending: requestOtpPending,
    data,
  } = useRequestOtpMutation({
    onSuccess: () => onNextScreen(),
    onError: error => console.log("error", error),
  });

  const { mutateAsync: topUp, isPending: topupPending } = useTopUpMutation({});

  const firstStep = (toCardId: string, amount: string) => {
    amountRef.current = amount;
    toCardRef.current = cards?.find(item => item.id === toCardId) ?? null;
    onNextScreen();
  };

  const callApi = async () => {
    await topUp({
      paymentAmount: amountRef.current,
      currencyCode: getCurrencyCode(selectedCard.currencyName),
      beneficiaryCardId: selectedCard.id,
      payerCardId: toCardRef.current?.id as string,
    }).catch(() => {
      setStatus({ status: "error", statusTitle: "Top up failed" });
    });
    onNextScreen();
  };

  const topUpFlowScreens = [
    {
      title: "Add Money",
      render: (
        <TopUp
          cards={cards?.filter(item => item.id !== selectedCard.id)}
          onSubmit={firstStep}
          cardNumber={selectedCard.cardNumber}
        />
      ),
    },
    {
      title: "Review Payment",
      render: (
        <TopUpConfirmation
          fromCardNumber={selectedCard.cardNumber}
          toCardNumber={toCardRef.current && toCardRef.current.cardNumber}
          amount={amountRef.current}
          onSubmit={requestOTP}
          isPending={requestOtpPending}
        />
      ),
    },
    {
      title: "Verification",
      render: (
        <Verification
          onSubmit={callApi}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={topupPending}
        />
      ),
    },
    {
      title: "StatusView",
      render: (
        <StatusView
          onSubmit={onNextScreen}
          status={status.status}
          statusTitle={status.statusTitle}
        />
      ),
    },
  ];

  return (
    <DialogFlow
      screensFlow={topUpFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
      showCloseButton={true}
      singleFlow={true}
    />
  );
}
