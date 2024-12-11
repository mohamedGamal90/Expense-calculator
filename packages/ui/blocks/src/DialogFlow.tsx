import { Dialog, StyledButton, StyledText, View } from "@aurora/components";
import { Dimensions, FlatList } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { Icon } from "@aurora/icons";
import { getTokens } from "@tamagui/core";

const screenWidth = Dimensions.get("window").width;
const dialogWidth = screenWidth > 700 ? 600 - 48 : screenWidth - 48;

type Props = {
  returnBackHandler: () => void;
  currentScreenIndex: number;
  setCurrentScreenIndex: Dispatch<SetStateAction<number>>;
  screensFlow: { title: string; render: JSX.Element }[];
  flatListRef: React.RefObject<FlatList>;
};
export const DialogFlow = ({
  returnBackHandler,
  currentScreenIndex,
  setCurrentScreenIndex,
  screensFlow,
  flatListRef,
}: Props) => {
  const { color } = getTokens();

  const onPrevScreen = () => {
    if (currentScreenIndex === 0) {
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

  return (
    <View flex={1}>
      {currentScreenIndex !== screensFlow.length - 1 && (
        <>
          <StyledText textAlign="center" variant="Heading2xl" color={"$secondary800"}>
            {screensFlow[currentScreenIndex].title}
          </StyledText>
          <StyledButton
            position="absolute"
            variant="iconBtn"
            backgroundColor={"$white"}
            borderColor={"$white"}
            width={40}
            height={26}
            onPress={onPrevScreen}
            left={0}
            top={-4}>
            <Icon name={"arrow-left"} width={26} height={26} color={color.$black.val} />
          </StyledButton>
        </>
      )}
      <FlatList
        ref={flatListRef}
        data={screensFlow}
        renderItem={({ item }) => (
          <View width={dialogWidth} paddingHorizontal={"$xxs"}>
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
