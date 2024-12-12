import { Dimensions, FlatList } from "react-native";
import { useRef, useState } from "react";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { CardType } from "@aurora/home/src/types/cardType";
import { useReportCardMutation } from "@metroid/card-management/src/ReportCard/hooks/useReportCardMutation";
import { StatusView, Verification } from "@aurora/blocks";
import { ReportCard } from "./ReportCardScreen";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";

const screenWidth = Dimensions.get("window").width;
export const dialogWidth = screenWidth > 700 ? 600 - 48 : screenWidth - 48;

type Props = { returnBackHandler: () => void; selectedCard: CardType };

export const ReportCardFlow = ({ returnBackHandler, selectedCard }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onNextScreen = () => {
    if (currentScreenIndex === ReportCardFlowScreens.length - 1) {
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
    onError: error => console.log("error", error),
  });

  const { mutateAsync: reportCard, isPending: reportCardIspending } = useReportCardMutation({
    onSuccess: () => onNextScreen(),
    onError: error => console.log("error", error),
  });

  const onReportCard = (otp: string) => {
    reportCard({
      cardId: selectedCard.id,
      otp,
    });
  };

  const ReportCardFlowScreens = [
    {
      title: "Report Card",
      render: (
        <ReportCard
          onSubmit={requestOTP}
          isPending={requestOtpPending}
          cardNumber={selectedCard.cardNumber.slice(-4)}
        />
      ),
    },
    {
      title: "Verification",
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
