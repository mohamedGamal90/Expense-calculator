import { CardType } from "@aurora/home/src/types/cardType";
import { DialogFlow } from "../DialogFlow";
import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { CardLimit, StatusView, Verification } from "../dialog-screens";
import { useRequestOtpMutation } from "./hooks/useRequestOtpMutation";

type Props = { returnBackHandler: () => void; selectedCard: CardType };
export const CardLimitFlow = ({ returnBackHandler, selectedCard }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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

  const CardLimitFlowScreens = [
    {
      title: "Card Limit",
      render: (
        <CardLimit
          cardNumber={selectedCard.cardNumber.slice(-4)}
          onSubmit={requestOTP}
          isPending={requestOtpPending}
        />
      ),
    },
    {
      title: "Verification",
      render: (
        <Verification
          onSubmit={onNextScreen}
          type={data?.data.email ? "email" : "mobile"}
          crediential={data?.data.email ?? data?.data.phoneNumber}
          isPending={false}
        />
      ),
    },
    {
      title: "StatusView",
      render: <StatusView onSubmit={onNextScreen} statusTitle={`Limit set Successfully`} />,
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
