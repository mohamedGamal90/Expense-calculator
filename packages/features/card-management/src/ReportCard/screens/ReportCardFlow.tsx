import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { useReportCardMutation } from "@metroid/card-management/src/ReportCard/hooks/useReportCardMutation";
import { StatusView } from "@aurora/blocks";
import { ReportCard } from "./ReportCardScreen";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { useTranslation } from "react-i18next";
import { Verification } from "../../verification";
import { errorHandler } from "@aurora/utils";

type Props = { returnBackHandler: () => void };

export const ReportCardFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: "Card reported successfully",
  });

  const selectedCard = useSelectedCard();

  if (!selectedCard) {
    return null;
  }

  const onNextScreen = () => {
    if (currentScreenIndex === reportCardFlowScreens.length - 1) {
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

  const { mutateAsync: reportCard, isPending: reportCardIspending } = useReportCardMutation({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["cardList"] });
      onNextScreen();
    },
  });

  const onReportCard = async (otp: string) => {
    await reportCard({
      cardId: selectedCard.id,
      otp,
    }).catch(error => {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
        throw errorMsg;
      }
      setStatus({
        status: "error",
        statusTitle: errorMsg ?? "Card report failed",
      });
    });
    queryClient.refetchQueries({ queryKey: ["cardList"] });
    onNextScreen();
  };

  const reportCardFlowScreens = [
    {
      title: t("titles.report-card"),
      render: <ReportCard onSubmit={requestOTP} isPending={requestOtpPending} />,
    },
    {
      title: t("titles.verification"),
      render: (
        <Verification
          onSubmit={onReportCard}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={reportCardIspending}
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
        />
      ),
    },
  ];

  return (
    <DialogFlow
      returnBackHandler={returnBackHandler}
      screensFlow={reportCardFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
    />
  );
};
