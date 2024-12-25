import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { getTokens } from "@tamagui/core";
import {
  CardActivationFlow,
  CardLimitFlow,
  ReportCardFlow,
  SetPinFlow,
} from "@metroid/card-management";
import { CardAvailableStatusCodes } from "../cardStatusCodes";
import { useSelectedCard } from "@metroid/store";
import { AvailableStatuses } from "@metroid/types";
import { useTranslation } from "react-i18next";

export const CardMangementDialogScreen = () => {
  const [render, setRender] = useState<JSX.Element>();
  const { t } = useTranslation();

  const selectedCard = useSelectedCard();

  const { color } = getTokens();

  const returnBackHandler = () => {
    setRender(undefined);
  };

  const cardIsValid: boolean = !selectedCard?.availableStatuses.some(
    (item: AvailableStatuses) => item.statusCode === CardAvailableStatusCodes.ReportLostOrStolen,
  );
  const setPinDisabled: boolean = !selectedCard?.availableStatuses.some(
    (item: AvailableStatuses) => item.statusCode === CardAvailableStatusCodes.SetPin,
  );
  const canbeDeactivated = selectedCard?.availableStatuses.some(
    (item: AvailableStatuses) => item.statusCode === CardAvailableStatusCodes.Activate,
  );
  const activationDisabled: boolean =
    !canbeDeactivated && selectedCard?.statusName !== "VALID CARD";

  const cardMangementList: {
    title: string;
    icon: IconKeys;
    render: JSX.Element;
    disabled: boolean;
  }[] = [
    {
      title: t("titles.card-activation"),
      icon: "freeze-card",
      render: <CardActivationFlow returnBackHandler={returnBackHandler} />,
      disabled: activationDisabled,
    },
    {
      title: t("titles.card-limits"),
      icon: "card-limit",
      render: <CardLimitFlow returnBackHandler={returnBackHandler} />,
      disabled: cardIsValid,
    },
    {
      title: t("titles.report-card"),
      icon: "report-card",
      render: <ReportCardFlow returnBackHandler={returnBackHandler} />,
      disabled: cardIsValid,
    },
    { title: t("titles.replace-card"), icon: "replace-card", render: <View />, disabled: true }, //untill it is implemented
    {
      title: t("titles.change-pin"),
      icon: "change-pin",
      render: <SetPinFlow returnBackHandler={returnBackHandler} />,
      disabled: setPinDisabled,
    },
    {
      title: t("titles.international-transactions"),
      icon: "arrow-swap-horizontal",
      render: <View />,
      disabled: true, //untill it is implemented
    },
  ];

  return (
    <>
      {render ?? (
        <>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={"$m"}>
            <Dialog.Title>
              <StyledText variant="Heading2xl" color={"$secondary800"}>
                {t("titles.card-management")}
              </StyledText>
            </Dialog.Title>
            <Dialog.Close asChild>
              <StyledButton
                variant="iconBtn"
                width={40}
                height={40}
                backgroundColor={"$white"}
                icon={<Icon name={"close-circle"} color={color.error600.val} />}
                borderWidth={0}
              />
            </Dialog.Close>
          </View>
          <FlatList
            data={cardMangementList}
            keyExtractor={item => item.title}
            renderItem={({ item, index }) => (
              <>
                <Pressable
                  onPress={() => {
                    if (!item.disabled) setRender(item?.render);
                  }}>
                  <View
                    flexDirection="row"
                    paddingVertical={"$m"}
                    alignItems="center"
                    justifyContent="space-between"
                    padding={"$s"}
                    borderRadius={"$xs"}>
                    <View flexDirection="row" gap={"$ml"} alignItems="center">
                      <View
                        padding={"$ml"}
                        backgroundColor={"$secondary100"}
                        opacity={item.disabled ? 0.8 : 1}
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={"$s"}>
                        <Icon
                          name={item.icon}
                          color={item.disabled ? color.secondary200.val : color.secondary900.val}
                        />
                      </View>
                      <StyledText
                        variant="BodySemiBoldml"
                        color={item.disabled ? "$secondary200" : "$neutral800"}>
                        {item.title}
                      </StyledText>
                    </View>
                    <Icon
                      name={"arrow-circle-right"}
                      color={item.disabled ? color.secondary200.val : color.secondary900.val}
                    />
                  </View>
                </Pressable>
                {index < cardMangementList.length - 1 && (
                  <View height={1} marginVertical={"$m"} backgroundColor={"$secondary100"} />
                )}
              </>
            )}
          />
        </>
      )}
    </>
  );
};
