import { createContext, useState } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: (expense) => {},
  addExpenses: (expenses) => {},
  removeExpense: (expense) => {},
});

const ExpenseContextProvider = ({ children }) => {
  const [expenseIds, setExpenseIds] = useState([]);

  const addExpense = (expense) => {
    setExpenseIds((currentExpenseIds) => [...currentExpenseIds, expense]);
  };
  const addExpenses = (expenses) => {
    setExpenseIds((currentExpenseIds) => [...currentExpenseIds, ...expenses]);
  };
  const removeExpense = (expense) => {
    setExpenseIds((currentExpenseIds) =>
      currentExpenseIds.filter((expenseID) => expenseID !== expense)
    );
  };

  const value = {
    expenses: expenseIds,
    addExpense: addExpense,
    addExpenses: addExpenses,
    removeExpense: removeExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
