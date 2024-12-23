import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CardActivation } from "./CardActivationScreen";
import { DialogFlow, StatusView, Verification } from "@aurora/blocks";
import { useActivateCardMutation, useDeactivateCardMutation } from "../hooks";
import { CardAvailableStatusCodes } from "../../CardMangement/cardStatusCodes";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { AvailableStatuses } from "@metroid/types";

type Props = { returnBackHandler: () => void };

export const CardActivationFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const selectedCard = useSelectedCard();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  if (!selectedCard) {
    return null;
  }

  const activationEnabled: boolean = selectedCard.availableStatuses.some(
    (item: AvailableStatuses) => item.statusCode === CardAvailableStatusCodes.Activate,
  );

  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: activationEnabled
      ? t("cardManagement.cardActivation.activate-success-txt")
      : t("cardManagement.cardActivation.deactivate-success-txt"),
  });

  const onNextScreen = () => {
    if (currentScreenIndex === CardLimitFlowScreens.length - 1) {
      returnBackHandler();
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
    onSuccess: () => {
      onNextScreen();
    },
    onError: error => console.log("error", error),
  });

  const { mutateAsync: activateCard, isPending: activePending } = useActivateCardMutation({});
  const { mutateAsync: deactivateCard, isPending: deactivePending } = useDeactivateCardMutation({});

  const onCardActivation = async (otp: string) => {
    if (activationEnabled)
      await activateCard({ cardId: selectedCard.id, otp }).catch(() =>
        setStatus({ status: "error", statusTitle: "Activation failed" }),
      );
    else
      await deactivateCard({ cardId: selectedCard?.id, otp }).catch(() =>
        setStatus({ status: "error", statusTitle: "Deactivation failed" }),
      );
    queryClient.refetchQueries({ queryKey: ["cardList"] });
    onNextScreen();
  };

  const CardLimitFlowScreens = [
    {
      title: "Card Activation",
      render: (
        <CardActivation
          selectedCard={selectedCard}
          onSubmit={requestOTP}
          isPending={requestOtpPending}
          activationEnabled={activationEnabled}
        />
      ),
    },
    {
      title: "Verification",
      render: (
        <Verification
          onSubmit={onCardActivation}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={activePending || deactivePending}
        />
      ),
    },
    {
      title: "StatusView",
      render: (
        <StatusView
          onSubmit={onNextScreen}
          statusTitle={status.statusTitle}
          status={status.status}
        />
      ),
    },
  ];
  return (
    <DialogFlow
      returnBackHandler={returnBackHandler}
      screensFlow={CardLimitFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
    />
  );
};
