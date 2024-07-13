import * as SQLite from "expo-sqlite";

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

export const fetchExpenses = async () =>
  await database.getAllAsync("SELECT * FROM Expenses");
