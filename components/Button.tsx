import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styleNumber, COLORS, fontSizes } from "../constants/constants";

type Props = {
  onPress: () => void;
  btnPlaceHolder: string;
  disabled?: boolean;
};
export const Button = ({ onPress, btnPlaceHolder, disabled }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[disabled ? [styles.Btn, styles.disabledBtn] : styles.Btn]}
    disabled={disabled}
  >
    <Text style={styles.BtnTxt}>{btnPlaceHolder}</Text>
  </TouchableOpacity>
);

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
  disabledBtn: {
    backgroundColor: COLORS.disabledGrey,
  },
  BtnTxt: { fontSize: fontSizes.labelFont },
});
