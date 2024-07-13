import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { PieChartComponent } from "../../../components/piechartComponent";
import {
  COLORS,
  fontSizes,
  spacing,
  styleNumber,
} from "../../../constants/constants";
import { ExpenseModal } from "../../../modals/expenseModal";

type PropType = {
  expensesOBJ: ExpenseModal[];
  monthlyDetailsHandler: () => void;
};
export const IncomeCard = ({
  expensesOBJ,
  monthlyDetailsHandler,
}: PropType) => {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);

  useEffect(() => {
    let expense = 0;
    let income = 0;
    expensesOBJ.map((singleExpense: ExpenseModal) => {
      if (singleExpense.type === "income") {
        income += singleExpense.amount;
      } else {
        expense += singleExpense.amount;
      }
    });
    setExpenseAmount(expense);
    setIncomeAmount(income);
  }, [expensesOBJ]);

  const expenseTotalHandlert = () => {
    let color: string = "";
    let total: string = "";
    if (incomeAmount > expenseAmount) {
      color = COLORS.neongreen2;
      total = "$" + (incomeAmount - expenseAmount);
    } else if (incomeAmount < expenseAmount) {
      color = COLORS.neonRed;
      total = "$" + (incomeAmount - expenseAmount);
    } else {
      color = "white";
      total = "$0";
    }
    return (
      <Text style={[styles.incomeExpenseTXT, { color: color }]}>{total}</Text>
    );
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={monthlyDetailsHandler}
    >
      <View style={styles.incomeExpenseContainer}>
        {expenseTotalHandlert()}
      </View>
      <View>
        <PieChartComponent
          expensesOBJ={expensesOBJ}
          widthAndHeight={100}
          listItems={false}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: 150,
    marginBottom: spacing.l,
    padding: spacing.s,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: styleNumber.borderRadius,
    borderWidth: 3,
    borderColor: COLORS.neongreen2,
  },
  incomeExpenseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  incomeExpenseTXT: {
    color: COLORS.white,
    fontSize: fontSizes.headingl,
  },
});
