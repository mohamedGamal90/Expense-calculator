import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { ExpenseContext } from "../../store/context/expense-context";
import { Expense } from "./Components/expense";
import { IncomeCard } from "./Components/incomeCard";
import { ExpenseModal } from "../../modals/expenseModal";
import { fetchExpenses } from "../../dataBase/databse";
import { COLORS } from "../../constants/constants";
import { Button } from "../../components/Button";

export const HomeScreen = () => {
  const { navigate } = useNavigation();

  const expenseCTX = useContext(ExpenseContext);
  const expensesOBJ: ExpenseModal[] = expenseCTX.expenses;
  const [start, setStart] = useState(true);

  const addExpenseHandler = () => {
    navigate("AddExpenseScreen" as never);
  };

  const monthlyDetailsHandler = () => {
    navigate("MonthDetailsScreen" as never);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchexpensesHandler = async () => {
      if (start) {
        const expenses = await fetchExpenses();
        expenseCTX.addExpenses(expenses);
        expenses.forEach((element: ExpenseModal) => {
          expenseCTX.addExpense(element);
        });
        setStart(false);
      }
    };

    if (isFocused) {
      fetchexpensesHandler();
    }
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, COLORS.black]}
      style={styles.mainContainer}
    >
      <IncomeCard
        expensesOBJ={expensesOBJ}
        monthlyDetailsHandler={monthlyDetailsHandler}
      />
      <Button onPress={addExpenseHandler} btnPlaceHolder={"Add Expenses"} />
      <View style={styles.expenseContainer}>
        <FlatList
          data={expensesOBJ}
          renderItem={(item) => <Expense expense={item.item} />}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
  },
  expenseContainer: {
    width: "100%",
    marginBottom: 15,
  },
});
