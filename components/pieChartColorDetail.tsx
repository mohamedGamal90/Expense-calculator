import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../constants/constants";

type PropType = {
  colorDetail: { amount: number; category: string; color: string };
};
const PieChartColorDetail = ({ colorDetail }: PropType) => {
  return (
    <>
      <View style={styles.colorDetailsContainer}>
        <View
          style={[styles.colorBox, { backgroundColor: colorDetail.color }]}
        ></View>
        <Text style={styles.Txt}>
          {colorDetail.category} $ {colorDetail.amount}
        </Text>
      </View>
    </>
  );
};

export default PieChartColorDetail;

const styles = StyleSheet.create({
  Txt: {
    color: COLORS.white,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  colorDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 14,
    marginBottom: 7,
  },
});
