import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { Icon, IconKeys } from "@aurora/icons";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { ReportCardFlow } from "../../dialog-flows/ReportCardFlow";
import { CardType } from "@aurora/home/src/types/cardType";

export const CardMangementDialogScreen = ({ selectedCard }: { selectedCard: CardType }) => {
  const [render, setRender] = useState<JSX.Element>();

  const returnBackHandler = () => {
    setRender(undefined);
  };
  const cardMangementList: { title: string; icon: IconKeys; render?: JSX.Element }[] = [
    { title: "Freeze Card", icon: "freeze-card" },
    { title: "Card Limits", icon: "card-limit" },
    {
      title: "Report Card",
      icon: "report-card",
      render: <ReportCardFlow returnBackHandler={returnBackHandler} selectedCard={selectedCard} />,
    },
    { title: "Replace Card", icon: "replace-card" },
    { title: "Change Pin", icon: "change-pin" },
    { title: "More", icon: "more-circle" },
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
                icon={<Icon name={"close-circle"} color={"#cb4137"} />}
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
                    if (item?.render) setRender(item?.render);
                  }}>
                  <View
                    flexDirection="row"
                    marginTop={index === 0 ? "$ml" : "$xl"}
                    marginBottom={index === cardMangementList.length - 1 ? "$ml" : "$xl"}>
                    <View flexDirection="row" gap={"$ml"} alignItems="center">
                      <View
                        padding={"$ml"}
                        backgroundColor={"$secondary100"}
                        justifyContent="center"
                        alignItems="center"
                        borderRadius={"$s"}>
                        <Icon name={item.icon} />
                      </View>
                      <StyledText variant="BodySemiBoldml" color={"$neutral800"}>
                        {item.title}
                      </StyledText>
                    </View>
                  </View>
                </Pressable>
                {index < cardMangementList.length - 1 && (
                  <View height={1} backgroundColor={"$secondary100"} />
                )}
              </>
            )}
          />
        </>
      )}
    </>
  );
};
