import { FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import { DialogFlow, StatusView, Verification } from "@aurora/blocks";
import { SetPinScreen } from "./SetPinScreen/index.web";
import { useSetPinMutation } from "../hooks/useSetPinMutation";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";

type Props = { returnBackHandler: () => void };

export function SetPinFlow({ returnBackHandler }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const [status, setStatus] = useState<{
    status: "success" | "error" | "pending";
    statusTitle: string;
  }>({
    status: "success",
    statusTitle: "Pin set successfully",
  });

  const selectedCard = useSelectedCard();

  if (!selectedCard) {
    return null;
  }

  const onNextScreen = () => {
    if (currentScreenIndex === SetPinFlowScreens.length - 1) {
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
  } = useSetPinMutation({});

  const onSetPin = async (otp: string) => {
    await setPin({
      cardId: selectedCard.id,
      otp,
    }).catch(() => {
      setStatus({ status: "error", statusTitle: "Error setting pin" });
    });
    onNextScreen();
  };

  useEffect(() => {
    requestOTP();
  }, []);

  const SetPinFlowScreens = [
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
      screensFlow={SetPinFlowScreens}
      flatListRef={flatListRef}
      currentScreenIndex={currentScreenIndex}
      setCurrentScreenIndex={setCurrentScreenIndex}
    />
  );
}
