import { StyleSheet, ImageBackground as RNImageBackground } from "react-native";
import { StyledText, View } from "@aurora/components";
import { CardType } from "@metroid/types";
import { memo } from "react";

type Props = { card: CardType; width: number };
export const CardItem = memo(({ card, width }: Props) => (
  <View w={width} h={200} ai="center" jc="center" px="$xl" alignSelf="center" mx="$auto">
    <RNImageBackground
      source={require("../../cardImage.png")}
      style={styles.imageBackground}
      resizeMode="contain">
      <View bg="black" alignSelf="center" br={5} p={5} r={55} t={155}>
        <StyledText variant="Headingl" col={"white"}>
          Ending with ** {card.cardMask.slice(-4)}
        </StyledText>
      </View>
    </RNImageBackground>
  </View>
));

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
