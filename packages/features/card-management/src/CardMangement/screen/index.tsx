import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { AvailableStatuse, CardType } from "@aurora/home/src/types/cardType";
import { getTokens } from "@tamagui/core";
import {
  CardActivationFlow,
  CardLimitFlow,
  ReportCardFlow,
  SetPinFlow,
} from "@metroid/card-management";
import { CardAvailableStatusCodes } from "../cardStatusCodes";

export const CardMangementDialogScreen = ({ selectedCard }: { selectedCard: CardType }) => {
  const [render, setRender] = useState<JSX.Element>();
  const { color } = getTokens();

  const returnBackHandler = () => {
    setRender(undefined);
  };
  const reportCardDisabled: boolean = !selectedCard?.availableStatuses.some(
    (item: AvailableStatuse) => item.statusCode === CardAvailableStatusCodes.ReportLostOrStolen,
  );

  const setPinDisabled: boolean = !selectedCard?.availableStatuses.some(
    (item: AvailableStatuse) => item.statusCode === CardAvailableStatusCodes.SetPin,
  );
  const canbeDeactivated = selectedCard?.availableStatuses.some(
    (item: AvailableStatuse) => item.statusCode === CardAvailableStatusCodes.Activate,
  );
  const activationDisabled: boolean = !canbeDeactivated && selectedCard.statusName !== "VALID CARD";
  const cardMangementList: {
    title: string;
    icon: IconKeys;
    render: JSX.Element;
    disabled: boolean;
  }[] = [
    {
      title: "Card Activation",
      icon: "freeze-card",
      render: (
        <CardActivationFlow returnBackHandler={returnBackHandler} selectedCard={selectedCard} />
      ),
      disabled: activationDisabled,
    },
    {
      title: "Card Limits",
      icon: "card-limit",
      render: <CardLimitFlow returnBackHandler={returnBackHandler} selectedCard={selectedCard} />,
      disabled: false,
    },
    {
      title: "Report Card",
      icon: "report-card",
      render: <ReportCardFlow returnBackHandler={returnBackHandler} selectedCard={selectedCard} />,
      disabled: reportCardDisabled,
    },
    { title: "Replace Card", icon: "replace-card", render: <View />, disabled: false },
    {
      title: "Change Pin",
      icon: "change-pin",
      render: <SetPinFlow returnBackHandler={returnBackHandler} selectedCard={selectedCard} />,
      disabled: setPinDisabled,
    },
    {
      title: "International Transactions",
      icon: "arrow-swap-horizontal",
      render: <View />,
      disabled: false,
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
                Card Management
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
