import React, { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { ExpenseContext } from "../store/context/expense-context";
import { ExpenseModal } from "../modals/expenseModal";
import PieChartComponent from "../components/piechartComponent";
import { COLORS } from "../constants/constants";

const MonthDetails = () => {
  const expenseCTX = useContext(ExpenseContext);
  const expensesOBJ: ExpenseModal[] = expenseCTX.expenses;
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);

  useLayoutEffect(() => {
    setIncomeAmount(0);
    setExpenseAmount(0);
    expensesOBJ.map((singleExpense: ExpenseModal) => {
      if (singleExpense.type === "income") {
        setIncomeAmount((prevState) => prevState + singleExpense.amount);
      } else {
        setExpenseAmount((prevState) => prevState + singleExpense.amount);
      }
    });
  }, [expensesOBJ]);

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, COLORS.black]}
      style={styles.container}
    >
      <View style={styles.incomeExpenseContainer}>
        <Text style={styles.expenseTxt}>income {incomeAmount}</Text>
        <Text style={styles.expenseTxt}>expense {expenseAmount}</Text>
      </View>
      <PieChartComponent
        expensesOBJ={expensesOBJ}
        widthAndHeight={250}
        listItems={true}
      />
    </LinearGradient>
  );
};

export default MonthDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  expenseTxt: {
    color: COLORS.white,
    fontSize: 20,
  },
  incomeExpenseContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-around",
    margin: 40,
  },
});
