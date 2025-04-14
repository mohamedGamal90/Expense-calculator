import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { CardLimit } from "./CardLimitScreen";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { StatusView } from "@aurora/blocks";
import { useSelectedCard } from "@metroid/store";
import { useSetCardLimitMutation } from "../hooks/useSetCardLimit";
import { useTranslation } from "react-i18next";
import { Verification } from "../../verification";
import { errorHandler } from "@aurora/utils";

type Props = { returnBackHandler: () => void };
export const CardLimitFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const { t } = useTranslation();

  const flatListRef = useRef<FlatList>(null);
  const selectedLimitRef = useRef({
    limitAmount: 0,
    limitType: "",
  });
  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: "Limit set Successfully",
  });

  const selectedCard = useSelectedCard();

  if (!selectedCard) {
    return null;
  }

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
    onError: error => errorHandler(error),
  });

  const { mutateAsync: setLimit, isPending: setLimitPending } = useSetCardLimitMutation({
    onSuccess: () => {
      onNextScreen();
    },
  });

  const firstStep = (limitAmount: number, limitType: string) => {
    selectedLimitRef.current = { limitAmount, limitType };
    requestOTP();
  };

  const secondStep = async (otp: string) => {
    await setLimit({
      cardId: selectedCard.id,
      newLimit: selectedLimitRef.current.limitAmount.toString(),
      limitType: selectedLimitRef.current.limitType,
      otp: otp,
    }).catch(error => {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
        throw errorMsg;
      }
      setStatus({
        status: "error",
        statusTitle: errorMsg ?? "Limit set failed",
      });
    });
    onNextScreen();
  };

  const CardLimitFlowScreens = [
    {
      title: t("titles.card-limit"),
      render: (
        <CardLimit selectedCard={selectedCard} onSubmit={firstStep} isPending={requestOtpPending} />
      ),
    },
    {
      title: t("titles.verification"),
      render: (
        <Verification
          onSubmit={secondStep}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={setLimitPending}
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
