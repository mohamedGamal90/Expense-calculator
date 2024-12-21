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

type Props = { returnBackHandler?: () => void };

export const SendMoneyFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const selectedCard = useSelectedCard();

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
    mutate: fetchCardHolderName,
    data: cardholderNameData,
    isPending: cardholderNameIsPending,
  } = useCardholderNameMutation({
    onSuccess: () => {
      onNextScreen();
    },
    onError(error) {},
  });

  const ReportCardFlowScreens = [
    {
      title: "Send Money",
      render: <SendMoney onSubmit={fetchCardHolderName} isPending={cardholderNameIsPending} />,
    },
    {
      title: "Preview",
      render: (
        <SelectedCardPreview
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
          onSubmit={sendMoney}
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
