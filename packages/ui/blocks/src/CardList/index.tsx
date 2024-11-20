import { View } from "tamagui";
import { CardItem } from "./CardItem";
import {
	Dimensions,
	FlatList,
	GestureResponderEvent,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Pressable,
} from "react-native";
import { Dispatch, SetStateAction, useRef } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Card } from "../types";
import { StyledButton } from "@aurora/components";

type CardListProps = {
	onChange?: (index: number) => void;
	isVertical?: boolean;
	currentIndex: number;
	setCurrentIndex: Dispatch<SetStateAction<number>>;
	cards: Card[];
};
const screenWidth = Dimensions.get("window").width;

export const CardList = ({
	cards,
	currentIndex,
	setCurrentIndex,
}: CardListProps) => {
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
	const handleMomentumScrollEnd = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const newIndex = Math.round(
			event.nativeEvent.contentOffset.x / screenWidth
		);
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
			<StyledButton
				position="absolute"
				left={20}
				backgroundColor={"black"}
				padding={2}
				height={30}
				width={30}
				icon={<AntDesign name="arrowleft" size={24} color="white" />}
				onPress={onPrev}
				zIndex={100}
				borderRadius={5}
				disabled={currentIndex === 0} // Disable when at the first item
			/>

			<Pressable
				style={{ width: "100%" }}
				onPressIn={handleTouchStart}
				onPressOut={handleTouchEnd}>
				<FlatList
					ref={flatListRef}
					data={cards}
					keyExtractor={(item) => `card-${item.id}`}
					renderItem={({ item }) => <CardItem card={item} />}
					horizontal
					pagingEnabled
					onScrollToIndexFailed={() => {
						console.log("sadas");
					}}
					bounces={false}
					getItemLayout={(_data, index) => ({
						length: screenWidth,
						offset: screenWidth * index,
						index,
					})}
					showsHorizontalScrollIndicator={false}
					decelerationRate="fast"
					snapToAlignment="center"
					snapToInterval={screenWidth}
					onMomentumScrollEnd={handleMomentumScrollEnd}
				/>
			</Pressable>

			<StyledButton
				position="absolute"
				right={20}
				width={30}
				backgroundColor={"black"}
				padding={2}
				height={30}
				icon={<AntDesign name="arrowright" size={24} color="white" />}
				onPress={onNext}
				borderRadius={5}
				disabled={currentIndex === cards.length - 1} // Disable when at the last item
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
