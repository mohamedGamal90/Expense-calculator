import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS, spacing } from "../constants/constants";

type PropType = {
  colorDetail: { amount: number; category: string; color: string };
};
export const PieChartColorDetail = ({ colorDetail }: PropType) => (
  <View style={styles.colorDetailsContainer}>
    <View
      style={[styles.colorBox, { backgroundColor: colorDetail.color }]}
    ></View>
    <Text style={styles.Txt}>
      {colorDetail.category}  ${colorDetail.amount}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  Txt: {
    color: COLORS.white,
  },
  colorBox: {
    width: spacing.l,
    height: spacing.l,
    marginRight: spacing.s,
  },
  colorDetailsContainer: {
    flexDirection: "row",
    marginTop: spacing.m,
    marginBottom: spacing.s,
  },
});
