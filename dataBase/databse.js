import * as SQLite from "expo-sqlite";

import { ExpenseModal } from "../modals/expenseModal";

const database = SQLite.openDatabaseSync("Expenses.db");

export const init = async () =>
  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS Expenses (
    name TEXT PRIMARY KEY NOT NULL,
    type TEXT NOT NULL,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    description TEXT NULL
  )`
  );

export const insertExpenses = async (expense) =>
  await database.runAsync(
    `INSERT INTO Expenses (name, type, amount, category, description) VALUES (?, ?, ?, ?, ?)`,
    expense.name,
    expense.type,
    expense.amount,
    expense.category,
    expense.description
  );

export const fetchExpenses = async () => {
  console.log("fetchExpenses");
  const allRows = await database.getAllAsync('SELECT * FROM test');
  for (const row of allRows) {
    console.log(row.id, row.value, row.intValue);
  }
  return [];
  // const promise = new Promise((resolve, reject) => {
  //   database.transaction((tx) => {
  //     tx.executeSql(
  //       "SELECT * FROM Expenses",
  //       [],
  //       (_, result) => {
  //         const expenses = [];

  //         for (const dp of result.rows._array) {
  //           expenses.push(
  //             new ExpenseModal(
  //               dp.name,
  //               dp.type,
  //               dp.amount,
  //               dp.category,
  //               dp.description
  //             )
  //           );
  //         }
  //         resolve(expenses);
  //       },
  //       (_, error) => {
  //         console.log("fetch error");
  //         reject(error);
  //       }
  //     );
  //   });
  // });

  // return promise;
};
