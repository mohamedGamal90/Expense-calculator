import { FlatList } from "react-native";
import { useEffect, useRef, useState } from "react";
import { DialogFlow, Verification } from "@aurora/blocks";
import { SetPinScreen } from "./SetPinScreen/index.web";
import { useSetPinMutation } from "../hooks/useSetPinMutation";
import { useRequestOtpMutation } from "../../CardMangement/hooks/useRequestOtpMutation";
import { useSelectedCard } from "@metroid/store";
import { useTranslation } from "react-i18next";
import { showAlert } from "@aurora/components";
import { ErrorType } from "@metroid/api";

type Props = { returnBackHandler: () => void };

export function SetPinFlow({ returnBackHandler }: Props) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { t } = useTranslation();
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

  const onErrorFunction = (error: ErrorType) => {
    showAlert({
      title: t("server-error.an_error_has_occurred"),
      message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
    });
  };

  const {
    mutateAsync: requestOTP,
    data,
    isPending,
  } = useRequestOtpMutation({
    onError: error => onErrorFunction(error),
  });

  const {
    mutateAsync: setPin,
    data: setPinUrl,
    isPending: setPinIsPending,
  } = useSetPinMutation({
    onSuccess: () => onNextScreen(),
    onError: error => onErrorFunction(error),
  });

  const onSetPin = async (otp: string) => {
    await setPin({
      cardId: selectedCard.id,
      otp,
    }).catch(error => onErrorFunction(error));
  };

  useEffect(() => {
    requestOTP();
  }, []);

  const SetPinFlowScreens = [
    {
      title: t("titles.verification"),
      render: (
        <Verification
          loading={isPending}
          onSubmit={onSetPin}
          type={data?.data.email ? "email" : "mobile"}
          credential={data?.data.email ?? data?.data.phoneNumber}
          isPending={setPinIsPending}
        />
      ),
    },
    {
      render: <SetPinScreen src={setPinUrl?.data.url} />,
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
