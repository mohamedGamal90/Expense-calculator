import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { CardActivation } from "./CardActivationScreen";
import { DialogFlow, StatusView } from "@aurora/blocks";
import { useActivateCardMutation, useDeactivateCardMutation } from "../hooks";
import { CardAvailableStatusCodes } from "../../CardMangement/cardStatusCodes";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { AvailableStatuses } from "@metroid/types";
import { Verification } from "../../verification";
import { errorHandler } from "@aurora/utils";

export const CardActivationFlow = ({ returnBackHandler }: { returnBackHandler: () => void }) => {
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
    onSuccess: () => onNextScreen(),
  });

  const { mutateAsync: activateCard, isPending: activePending } = useActivateCardMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cardList"] });
      onNextScreen();
    },
  });
  const { mutateAsync: deactivateCard, isPending: deactivePending } = useDeactivateCardMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cardList"] });
      onNextScreen();
    },
  });

  const onCardActivation = async (otp: string) => {
    if (activationEnabled)
      await activateCard({ cardId: selectedCard.id, otp }).catch(error => {
        const errorMsg = error?.response?.data?.message;
        if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
          throw errorMsg;
        }
        setStatus({
          status: "error",
          statusTitle: errorMsg ?? "Activation failed",
        });
        onNextScreen();
      });
    else
      await deactivateCard({ cardId: selectedCard?.id, otp }).catch(error => {
        const errorMsg = error?.response?.data?.message;
        if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
          throw errorMsg;
        }
        setStatus({
          status: "error",
          statusTitle: errorMsg ?? "Deactivation failed",
        });
        onNextScreen();
      });
  };

  const CardLimitFlowScreens = [
    {
      title: t("titles.card-activation"),
      render: (
        <CardActivation
          selectedCard={selectedCard}
          onSubmit={() => requestOTP().catch(error => errorHandler(error))}
          isPending={requestOtpPending}
          activationEnabled={activationEnabled}
        />
      ),
    },
    {
      title: t("titles.verification"),
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
      title: t("titles.status-view"),
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
