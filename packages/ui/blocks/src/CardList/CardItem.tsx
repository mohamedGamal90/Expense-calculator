import { memo } from "react";
import {
	StyleSheet,
	ImageBackground as RNImageBackground,
	Dimensions,
} from "react-native";
import { Card } from "../types";
import { StyledText, View } from "@aurora/components";

const screenWidth = Dimensions.get("window").width;

type Props = {
	card: Card;
};

export const CardItem = memo(({ card }: Props) => {
	return (
		<View
			width={screenWidth}
			height={200}
			alignItems="center"
			justifyContent="center"
			paddingHorizontal="$xl"
			alignSelf="center"
			marginHorizontal="$auto">
			<RNImageBackground
				source={require("./cardImage.png")}
				style={styles.imageBackground}
				resizeMode="contain">
				<View
					backgroundColor="black"
					alignSelf="center"
					borderRadius={5}
					padding={5}
					right={50}
					top={148}>
					<StyledText variant="Headingxl" color={"white"}>
						{card.cardMask}
					</StyledText>
				</View>
			</RNImageBackground>
		</View>
	);
});

const styles = StyleSheet.create({
	imageBackground: {
		width: "100%",
		height: "100%",
		aspectRatio: 1, // Ensure aspect ratio is maintained
		position: "absolute",
		zIndex: -1,
		alignSelf: "center",
		transform: [{ scale: 0.9 }],
	},
});
