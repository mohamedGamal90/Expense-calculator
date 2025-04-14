import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { DialogFlow } from "@aurora/blocks/src/DialogFlow";
import { StatusView } from "@aurora/blocks";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { SendMoney } from "./SendMoneyScreen";
import { useSendMoneyMutation } from "../hooks/useSendMoneyMutation";
import { useCardholderNameMutation } from "../hooks/useGetCardholderNameMutation";
import { SelectedCardPreview } from "./SelectedCardPreviewScreen";
import { getCurrencyCode, errorHandler } from "@aurora/utils";
import { Verification } from "../../verification";

type Props = { returnBackHandler?: () => void };

export const SendMoneyFlow = ({ returnBackHandler }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const amountRef = useRef<string>("");
  const toCardNumber = useRef<string>("");
  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: "Send money successfully",
  });

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
    onError: error => errorHandler(error),
  });

  const { mutateAsync: sendMoney, isPending: sendMoneyIsPending } = useSendMoneyMutation({
    onSuccess: () => onNextScreen(),
    onError: error => {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
        throw errorMsg;
      }
      setStatus({
        status: "error",
        statusTitle: errorMsg ?? "Send money failed.",
      });
      onNextScreen();
    },
  });

  const {
    mutateAsync: fetchCardHolderName,
    data: cardholderNameData,
    isPending: cardholderNameIsPending,
  } = useCardholderNameMutation({
    onSuccess: () => onNextScreen(),
  });

  const firstStep = async ({ amount, cardNumber }: { amount: string; cardNumber: string }) => {
    amountRef.current = amount;
    toCardNumber.current = cardNumber;
    await fetchCardHolderName({ cardNumber }).catch(error => errorHandler(error));
  };

  const onSendMoney = async (otp: string) => {
    await sendMoney({
      paymentAmount: amountRef.current,
      currencyCode: getCurrencyCode(selectedCard.currencyName),
      beneficiaryCardNumber: toCardNumber.current,
      payerCardId: selectedCard?.id as string,
      otp,
    });
  };

  const ReportCardFlowScreens = [
    {
      title: "Send Money",
      render: (
        <SendMoney
          cardNumber={selectedCard.cardNumber.slice(-4)}
          productNumber={selectedCard.productNumber}
          onSubmit={firstStep}
          isPending={cardholderNameIsPending}
        />
      ),
    },
    {
      title: "Preview",
      render: (
        <SelectedCardPreview
          fromCardNumber={selectedCard.cardNumber}
          toCardNumber={toCardNumber.current && toCardNumber.current}
          amount={amountRef.current}
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
          onSubmit={onSendMoney}
          isPending={sendMoneyIsPending}
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
          singleFlow={true}
        />
      ),
    },
  ];

  return (
    <DialogFlow
      returnBackHandler={returnBackHandler}
      screensFlow={ReportCardFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
      showCloseButton={true}
      singleFlow={true}
    />
  );
};
