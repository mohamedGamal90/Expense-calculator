import { memo } from "react";
import { StyleSheet, ImageBackground as RNImageBackground } from "react-native";
import { Card } from "../types";
import { StyledText, View } from "@aurora/components";

type Props = {
  card: Card;
  width: number;
};

export const CardItem = memo(({ card, width }: Props) => {
  return (
    <View
      width={width}
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
          right={58}
          top={148}>
          <StyledText variant="Headingl" color={"white"}>
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
