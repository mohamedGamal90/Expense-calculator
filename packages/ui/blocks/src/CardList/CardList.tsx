import { useState, useEffect } from "react";
import { View } from "tamagui";
import { CardItem } from "./component/CardItem";
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import { useRef } from "react";
import { ControlIndexBtn } from "./component/ControlIndexBtn";
import { Icon } from "@aurora/icons";
import { getTokens } from "@tamagui/core";
import { useSelectedCardActions } from "@metroid/store";
import { useWindowDimensions } from "@aurora/components";
import { useGetCardsQuery, useIsRtl } from "@metroid/hooks";
import { CardListLoading } from "./component/CardListLoading";

export const CardList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const { width: screenWidth } = useWindowDimensions();
  const { color, space } = getTokens();

  const isRtl = useIsRtl();
  const { setSelectedCard } = useSelectedCardActions();

  const { data: cards } = useGetCardsQuery();

  const width = screenWidth - space.base.val * 2 - 255;

  useEffect(() => {
    if (cards) {
      setSelectedCard(cards[0]);
    }
  }, [cards]);

  if (!cards) {
    return <CardListLoading />;
  }

  const onNext = () => {
    const nextIndex = Math.min(currentIndex + 1, cards.length - 1);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
    setCurrentIndex(nextIndex);
    setSelectedCard(cards[nextIndex]);
  };

  const onPrev = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
    setCurrentIndex(prevIndex);
    setSelectedCard(cards[prevIndex]);
  };
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
    setSelectedCard(cards[newIndex]);
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
    setSelectedCard(cards[index]);
  };
  return (
    <View position="relative">
      <View flexDirection="row-reverse" justifyContent="center" alignItems="center" flex={1}>
        <ControlIndexBtn
          onPress={onPrev}
          left={20}
          icon={
            <Icon
              // style={{ transform: [{ scaleX: isRtl ? 1 : -1 }] }}
              name={"arrow-left"}
              color={color.$white.val}
              width={24}
              height={24}
            />
          }
          disabled={currentIndex === 0}
        />

        <Pressable
          style={{ width: "100%" }}
          onPressIn={handleTouchStart}
          onPressOut={handleTouchEnd}>
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
          style={{ transform: [{ scaleX: isRtl ? -1 : 1 }] }}
          onPress={onNext}
          right={20}
          icon={<Icon name={"arrow-right"} color={color.white.val} width={24} height={24} />}
          disabled={currentIndex === cards.length - 1}
        />
      </View>

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
