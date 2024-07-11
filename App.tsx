import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import AppLoading from "expo-app-loading";

import HomeScreen from "./screens/homeScreen";
import { ExpenseForm } from "./screens/addExpense";
import ExpenseContextProvider from "./store/context/expense-context";
import MonthDetails from "./screens/monthDetails";
import { init } from "./dataBase/databse";
import { COLORS } from "./constants/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(true);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(false);
      })
      .catch((error) => {
        console.error("Error initializing database:", error);
      });
  }, []);

  // if (dbInitialized) {
  //   return <AppLoading />;
  // }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <ExpenseContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: COLORS.neonGrey },
            headerTintColor: COLORS.black,
            headerShadowVisible: false,
            animation: "fade_from_bottom",
            title: "",
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            options={{ title: "Expense Form" }}
            name="AddExpenseScreen"
            component={ExpenseForm}
          />
          <Stack.Screen
            options={{ title: "Month Details" }}
            name="MonthDetailsScreen"
            component={MonthDetails}
          />
        </Stack.Navigator>
      </ExpenseContextProvider>
    </NavigationContainer>
  );
}
