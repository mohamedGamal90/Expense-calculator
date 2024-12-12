import { CardType } from "@aurora/home/src/types/cardType";
import { FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import { DialogFlow, StatusView, Verification } from "@aurora/blocks";
import { SetPinScreen } from "./SetPinScreen/index.web";
import { useSetPinMutation } from "../hooks/useSetPinMutation";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";

type Props = { returnBackHandler: () => void; selectedCard: CardType };

export function SetPinFlow({ returnBackHandler, selectedCard }: Props) {
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

  const { mutateAsync: requestOTP, data } = useRequestOtpMutation({
    onError: error => console.log("error", error),
  });

  const {
    mutateAsync: setPin,
    data: setPinUrl,
    isPending: setPinIsPending,
  } = useSetPinMutation({
    onSuccess(data) {
      onNextScreen();
    },
  });

  const onSetPin = (otp: string) => {
    setPin({
      cardId: selectedCard.id,
      otp,
    });
  };

  useEffect(() => {
    requestOTP();
  }, []);

  const CardLimitFlowScreens = [
    {
      title: "Verification",
      render: (
        <Verification
          onSubmit={onSetPin}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={setPinIsPending}
        />
      ),
    },
    {
      title: "",
      render: <SetPinScreen src={setPinUrl?.data.url} />,
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
}
