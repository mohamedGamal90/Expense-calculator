import { Dialog, StyledText, View } from "@aurora/components";
import { Dimensions, FlatList } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { DialogFlowBtn } from "./DialogFlowBtn";
// import { isRtl } from "@metroid/store";

const screenWidth = Dimensions.get("window").width;
const dialogWidth = screenWidth > 700 ? 600 - 48 : screenWidth - 48;

type Props = {
  returnBackHandler?: () => void;
  currentScreenIndex: number;
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>;
  screensFlow: { title?: string; render: JSX.Element }[];
  flatListRef: React.RefObject<FlatList>;
  showCloseButton?: boolean;
  singleFlow?: boolean;
};
export const DialogFlow = ({
  returnBackHandler,
  currentScreenIndex,
  setCurrentScreenIndex,
  screensFlow,
  flatListRef,
  showCloseButton,
  singleFlow,
}: Props) => {
  const onPrevScreen = () => {
    if (currentScreenIndex === 0 && returnBackHandler) {
      returnBackHandler();
      return;
    }
    const prevIndex = currentScreenIndex - 1;
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
    setCurrentScreenIndex(prevIndex);
  };

  const showBackArrow: boolean = (() => {
    if (singleFlow && currentScreenIndex === 0) return false;
    return true;
  })();

  return (
    <View flex={1}>
      {currentScreenIndex !== screensFlow.length - 1 && (
        <>
          {showBackArrow && <DialogFlowBtn close={false} onPress={onPrevScreen} />}
          <Dialog.Title textAlign="center">
            <StyledText variant="Heading2xl" color="$secondary800">
              {screensFlow[currentScreenIndex].title}
            </StyledText>
          </Dialog.Title>
          {showCloseButton && <DialogFlowBtn close={true} />}
        </>
      )}
      <FlatList
        ref={flatListRef}
        data={screensFlow}
        renderItem={({ item }) => (
          <View width={dialogWidth} paddingHorizontal="$xxs">
            {item.render}
          </View>
        )}
        scrollEnabled={false}
        keyExtractor={item => item.title}
        horizontal
        getItemLayout={(_data, index) => ({
          length: dialogWidth,
          offset: dialogWidth * index,
          index,
        })}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={dialogWidth}
      />
    </View>
  );
};
