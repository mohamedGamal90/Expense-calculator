import { View } from "tamagui";
import { CardItem } from "./component/CardItem";
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import { CardType } from "@aurora/home/src/types/cardType";
import { Dispatch, SetStateAction, useRef } from "react";
import { ControlIndexBtn } from "./component/ControlIndexBtn";
import { Icon } from "@aurora/icons";

type CardListProps = {
  onChange?: (index: number) => void;
  isVertical?: boolean;
  cards: CardType[];
  width: number;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
};

export const CardList = ({ cards, width, currentIndex, setCurrentIndex }: CardListProps) => {
  const flatListRef = useRef<FlatList>(null);

  const onNext = () => {
    const nextIndex = Math.min(currentIndex + 1, cards.length - 1);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setCurrentIndex(nextIndex);
  };

  const onPrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
    setCurrentIndex(prevIndex);
  };
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (event: GestureResponderEvent) => {
    touchStartX = event.nativeEvent.pageX;
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    touchEndX = event.nativeEvent.pageX;
    if (touchStartX - touchEndX > 20) {
      onNext();
    }
    if (touchEndX - touchStartX > 20) {
      onPrev();
    }
  };
  const handleChooseDot = (index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
    setCurrentIndex(index);
  };
  return (
    <View position="relative" justifyContent="center">
      <ControlIndexBtn
        onPress={onPrev}
        left={20}
        icon={<Icon name={"arrow-left"} color="#ffff" width={24} height={24} />}
        disabled={currentIndex === 0}
      />

      <Pressable style={{ width: "100%" }} onPressIn={handleTouchStart} onPressOut={handleTouchEnd}>
        <FlatList
          ref={flatListRef}
          data={cards}
          keyExtractor={item => `card-${item.id}`}
          renderItem={({ item }) => <CardItem card={item} width={width} />}
          horizontal
          pagingEnabled
          onScrollToIndexFailed={() => {
            console.log("sadas");
          }}
          bounces={false}
          getItemLayout={(_data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="center"
          snapToInterval={width}
          onMomentumScrollEnd={handleMomentumScrollEnd}
        />
      </Pressable>
      <ControlIndexBtn
        onPress={onNext}
        right={20}
        icon={<Icon name={"arrow-right"} color="#ffff" width={24} height={24} />}
        disabled={currentIndex === cards.length - 1}
      />

      <View gap={5} flexDirection="row" alignSelf="center" marginVertical={10}>
        {cards.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => handleChooseDot(index)}
            style={{
              backgroundColor: currentIndex === index ? "black" : "grey",
              transform: [{ scale: currentIndex === index ? 1.25 : 1 }],
              width: 10,
              height: 10,
              borderRadius: 100,
            }}
          />
        ))}
      </View>
    </View>
  );
};
