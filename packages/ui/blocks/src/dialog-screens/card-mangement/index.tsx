import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { ReportCard } from "../report-card";

const cardMangementList = [
  { title: "Freeze Card", icon: <Icon name={"freeze-card"} /> },
  { title: "Card Limits", icon: <Icon name={"card-limit"} /> },
  {
    title: "Report Card",
    icon: <Icon name={"report-card"} />,
    render: () => <ReportCard onSubmit={() => {}} />,
  },
  { title: "Replace Card", icon: <Icon name={"replace-card"} /> },
  { title: "Change Pin", icon: <Icon name={"change-pin"} /> },
  { title: "More", icon: <Icon name={"more-circle"} /> },
];

export const CardMangementDialogScreen = () => {
  const [render, setRender] = useState<JSX.Element>();
  return (
    <>
      {render ?? (
        <>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={"$m"}>
            <StyledText variant="Heading2xl" color={"$secondary800"}>
              Card Management
            </StyledText>
            <Dialog.Close asChild>
              <StyledButton
                variant="secondary"
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
                <TouchableOpacity
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
                        {item.icon}
                      </View>
                      <StyledText variant="BodySemiBoldml" color={"$neutral800"}>
                        {item.title}
                      </StyledText>
                    </View>
                  </View>
                </TouchableOpacity>
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
