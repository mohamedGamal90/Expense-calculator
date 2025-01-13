import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { useReportCardMutation } from "@metroid/card-management/src/ReportCard/hooks/useReportCardMutation";
import { StatusView, Verification } from "@aurora/blocks";
import { ReportCard } from "./ReportCardScreen";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { useTranslation } from "react-i18next";
import { showAlert } from "@aurora/components";

type Props = { returnBackHandler: () => void };

export const ReportCardFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
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
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  const { mutateAsync: reportCard, isPending: reportCardIspending } = useReportCardMutation({
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  const onReportCard = async (otp: string) => {
    await reportCard({
      cardId: selectedCard.id,
      otp,
    }).catch(() => {
      setStatus({ status: "error", statusTitle: "Card report failed" });
    });
    onNextScreen();
  };

  const reportCardFlowScreens = [
    {
      title: t("titles.report-card"),
      render: (
        <ReportCard
          onSubmit={requestOTP}
          isPending={requestOtpPending}
          cardNumber={selectedCard.cardNumber.slice(-4)}
        />
      ),
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
