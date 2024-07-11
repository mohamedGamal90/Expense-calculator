import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styleNumber, COLORS, fontSizes } from "../constants/constants";

type Props = { onPress: () => void; btnPlaceHolder: string };
export const Button = ({ onPress, btnPlaceHolder }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.Btn}>
      <Text style={styles.BtnTxt}>{btnPlaceHolder}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Btn: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: styleNumber.borderRadius,
    backgroundColor: COLORS.neongreen2,
    marginTop: 20,
    width: "85%",
  },
  BtnTxt: { fontSize: fontSizes.labelFont },
});
