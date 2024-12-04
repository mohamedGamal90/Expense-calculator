import { Dimensions, FlatList } from "react-native";
import { ReportCard } from "../dialog-screens/report-card";
import { useRef, useState } from "react";
import { Verification } from "../dialog-screens/verification";
import { StatusView } from "../dialog-screens/status-view";
import { DialogFlow } from "../DialogFlow";
import { CardType } from "@aurora/home/src/types/cardType";

const screenWidth = Dimensions.get("window").width;
export const dialogWidth = screenWidth > 700 ? 600 - 48 : screenWidth - 48;

type Props = { returnBackHandler: () => void; selectedCard: CardType };
export const ReportCardFlow = ({ returnBackHandler, selectedCard }: Props) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onNextScreen = () => {
    if (currentScreenIndex === ReportCardFlowScreens.length - 1) {
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

  const ReportCardFlowScreens = [
    {
      title: "Report Card",
      render: <ReportCard onSubmit={onNextScreen} />,
    },
    {
      title: "Verification",
      render: <Verification onSubmit={onNextScreen} type={"email"} />,
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
