import * as SQLite from "expo-sqlite";

import { ExpenseModal } from "../modals/expenseModal";

const database = SQLite.openDatabase("Expenses.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Expenses (
            name TEXT PRIMARY KEY NOT NULL,
            type TEXT NOT NULL,
            amount INTEGER NOT NULL,
            category TEXT NOT NULL,
            description TEXT NULL
          )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertExpenses = (expense) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO Expenses (name, type, amount, category, description) VALUES (?, ?, ?, ?, ?)`,
        [
          expense.name,
          expense.type,
          expense.amount,
          expense.category,
          expense.description,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const fetchExpenses = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM Expenses",
        [],
        (_, result) => {
          const expenses = [];

          for (const dp of result.rows._array) {
            expenses.push(
              new ExpenseModal(
                dp.name,
                dp.type,
                dp.amount,
                dp.category,
                dp.description
              )
            );
          }
          resolve(expenses);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
};
