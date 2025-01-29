import { FlatList } from "react-native";
import { CardType } from "@metroid/types";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DialogFlow, StatusView } from "@aurora/blocks";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { TopUpConfirmation } from "./TopUpConfirmationScreen";
import { useTopUpMutation } from "../hooks/useTopUpMutation";
import { useGetCardsQuery } from "@metroid/hooks";
import { useSelectedCard } from "@metroid/store";
import { getCurrencyCode, errorHandler } from "@aurora/utils";
import { useTranslation } from "react-i18next";
import { TopUp } from "./TopUpScreen";
import { Verification } from "../../verification";

export function TopUpFlow() {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);
  const toCardRef = useRef<CardType | null>(null);
  const queryClient = useQueryClient();
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
  });

  const { mutateAsync: topUp, isPending: topupPending } = useTopUpMutation();

  const firstStep = (toCardId: string, amount: string) => {
    amountRef.current = amount;
    toCardRef.current = cards?.find(item => item.id === toCardId) ?? null;
    onNextScreen();
  };

  const callOtpApi = async () => {
    await requestOTP().catch(error => errorHandler(error));
  };

  const callTopUpApi = async () => {
    await topUp({
      paymentAmount: amountRef.current,
      currencyCode: getCurrencyCode(selectedCard.currencyName),
      beneficiaryCardId: selectedCard.id,
      payerCardId: toCardRef.current?.id as string,
    }).catch(error =>
      setStatus({
        status: "error",
        statusTitle: error?.response?.data?.message ?? "Top up failed",
      }),
    );
    queryClient.refetchQueries({ queryKey: ["cardList"] });
    onNextScreen();
  };

  const topUpFlowScreens = [
    {
      title: t("titles.add-money"),
      render: (
        <TopUp cards={cards?.filter(item => item.id !== selectedCard.id)} onSubmit={firstStep} />
      ),
    },
    {
      title: t("titles.review-payment"),
      render: (
        <TopUpConfirmation
          fromCardNumber={selectedCard.cardNumber}
          toCardNumber={(toCardRef.current && toCardRef.current.cardNumber) as string}
          amount={amountRef.current}
          onSubmit={callOtpApi}
          isPending={requestOtpPending}
        />
      ),
    },
    {
      title: t("titles.verification"),
      render: (
        <Verification
          onSubmit={callTopUpApi}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={topupPending}
        />
      ),
    },
    {
      title: t("titles.status-view"),
      render: (
        <StatusView
          onSubmit={onNextScreen}
          status={status.status}
          statusTitle={status.statusTitle}
          singleFlow={true}
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
