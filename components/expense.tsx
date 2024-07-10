import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { COLORS, styleNumber } from "../constants/constants";
import { ExpenseModal } from "../modals/expenseModal";

type PropType = {
  expense: ExpenseModal;
};
const Expense = ({ expense }: PropType) => {
  const [icon, setIcon] = useState("");
  const [color, setColor] = useState("");

  useLayoutEffect(() => {
    const returnAmountColor = () => {
      if (expense.type === "income") {
        setIcon("arrow-right");
        setColor(COLORS.neongreen2);
      } else {
        setIcon("arrow-left");
        setColor(COLORS.neonRed);
      }
    };
    returnAmountColor();
  }, []);

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

export default Expense;

const styles = StyleSheet.create({
  expenseContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: COLORS.neonGrey,
    width: "100%",
    borderRadius: styleNumber.borderRadius,
    overflow: "hidden",
    flexDirection: "row",
  },
  cardTxt: {
    color: COLORS.white,
    fontSize: 17,
  },
  cardCategoryTxt: {
    color: "grey",
    fontSize: 17,
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountTxt: {
    fontSize: 24,
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
