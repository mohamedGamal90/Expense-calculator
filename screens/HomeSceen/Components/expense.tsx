import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  COLORS,
  fontSizes,
  spacing,
  styleNumber,
} from "../../../constants/constants";
import { ExpenseModal } from "../../../modals/expenseModal";

type PropType = {
  expense: ExpenseModal;
};
export const Expense = ({ expense }: PropType) => {
  const icon = expense.type === "income" ? "arrow-right" : "arrow-left";
  const color = expense.type === "income" ? COLORS.neongreen2 : COLORS.neonRed;

  return (
    <View style={styles.expenseContainer}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <View style={styles.txtContainer}>
        <View>
          <Text style={styles.cardTxt}>{expense.name}</Text>
          <Text style={styles.cardCategoryTxt}>{expense.category}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.amountTxt, { color: color }]}>
            $ {expense.amount}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    marginHorizontal: "5%",
    marginVertical: spacing.s,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderWidth: 3,
    borderColor: COLORS.neonGrey,
    borderRadius: styleNumber.borderRadius,
    overflow: "hidden",
    flexDirection: "row",
  },
  cardTxt: {
    color: COLORS.white,
    fontSize: fontSizes.labelfontmedium,
  },
  cardCategoryTxt: {
    color: "grey",
    fontSize: fontSizes.labelfontmedium,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountTxt: {
    fontSize: fontSizes.heading,
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },
  txtContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
