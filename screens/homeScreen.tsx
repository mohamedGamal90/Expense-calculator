import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import { ExpenseContext } from "../store/context/expense-context";
import Expense from "../components/expense";
import IncomeCard from "../components/incomeCard";
import { ExpenseModal } from "../modals/expenseModal";
import { fetchExpenses } from "../dataBase/databse";
import { COLORS, styleNumber } from "../constants/constants";

const HomeScreen = ({ navigation }: any) => {
  const expenseCTX = useContext(ExpenseContext);
  const expensesOBJ: ExpenseModal[] = expenseCTX.expenses;
  const [start, setStart] = useState(true);

  const addExpenseHandler = () => {
    navigation.navigate("AddExpenseScreen");
  };

  const monthlyDetailsHandler = () => {
    navigation.navigate("MonthDetailsScreen");
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchexpensesHandler = async () => {
      if (start) {
        console.log(!start);
        const expenses = await fetchExpenses();
        expenseCTX.addExpenses(expenses);
        // expenses.forEach((element: ExpenseModal) => {
        //   expenseCTX.addExpense(element);
        // });}
        setStart(false);
      }
    };

    if (isFocused) {
      fetchexpensesHandler();
    }
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, "black"]}
      style={styles.mainContainer}
    >
      <IncomeCard
        expensesOBJ={expensesOBJ}
        monthlyDetailsHandler={monthlyDetailsHandler}
      />
      <TouchableOpacity
        onPress={addExpenseHandler}
        style={styles.addExpenseButton}
      >
        <Text>Add Expenses</Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewcontentContainerStyle}
        style={styles.scrollViewContainer}
      >
        <View style={styles.expenseContainer}>
          <View></View>
          <View>
            <FlatList
              data={expensesOBJ}
              renderItem={(item) => <Expense expense={item.item} />}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    width: "100%",
    marginVertical: 10,
  },
  scrollViewcontentContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  expenseContainer: {
    width: "90%",
    marginVertical: 20,
    padding: 10,
    paddingBottom: 140,
  },
  addExpenseButton: {
    padding: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: COLORS.neongreen2,
    marginBottom: 5,
    borderRadius: styleNumber.borderRadius,
  },
});
