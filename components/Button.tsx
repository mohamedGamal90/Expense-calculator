import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styleNumber, COLORS, fontSizes, spacing } from "../constants/constants";

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
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: styleNumber.borderRadius,
    backgroundColor: COLORS.neongreen2,
    width: "85%",
  },
  disabledBtn: {
    backgroundColor: COLORS.disabledGrey,
  },
  BtnTxt: { fontSize: fontSizes.labelFont },
});
