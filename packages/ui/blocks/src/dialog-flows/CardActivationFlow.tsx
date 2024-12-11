import { useRef, useState } from "react";
import { FlatList } from "react-native";
import { CardActivation, StatusView, Verification } from "../dialog-screens";
import { DialogFlow } from "../DialogFlow";
import { AvailableStatuse, CardType } from "@aurora/home/src/types/cardType";
import { useRequestOtpMutation } from "./hooks/useRequestOtpMutation";
import { CardAvailableStatusCodes } from "../dialog-screens/card-mangement/cardStatusCodes";
import { useActivateCardMutation } from "./hooks/useActivateCardMutation";
import { useDeactivateCardMutation } from "./hooks/useDeactivateCardMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

type Props = { returnBackHandler: () => void; selectedCard: CardType };

export const CardActivationFlow = ({ returnBackHandler, selectedCard }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const activationEnabled: boolean = selectedCard?.availableStatuses.some(
    (item: AvailableStatuse) => item.statusCode === CardAvailableStatusCodes.Activate,
  );
  const statusTxt = activationEnabled
    ? t("cardManagement.cardActivation.activate-success-txt")
    : t("cardManagement.cardActivation.deactivate-success-txt");

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

  const { mutateAsync: activateCard } = useActivateCardMutation({
    onError: error => console.log("error", error),
  });
  const { mutateAsync: deactivateCard } = useDeactivateCardMutation({
    onError: error => console.log("error", error),
  });

  const onCardActivation = (otp: string) => {
    if (activationEnabled) activateCard({ cardId: selectedCard?.id, otp });
    else deactivateCard({ cardId: selectedCard?.id, otp });
    onNextScreen();
    queryClient.refetchQueries({ queryKey: ["cardList"] });
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
          crediential={data?.data.email ?? data?.data.phoneNumber}
          isPending={false}
        />
      ),
    },
    {
      title: "StatusView",
      render: <StatusView onSubmit={onNextScreen} statusTitle={statusTxt} />,
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
