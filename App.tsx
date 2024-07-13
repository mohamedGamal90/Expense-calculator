import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { HomeScreen } from "./screens/HomeSceen/homeScreen";
import { ExpenseForm } from "./screens/ExpenseFormScreen/ExpenseForm";
import ExpenseContextProvider from "./store/context/expense-context";
import { init } from "./dataBase/databse";
import { COLORS } from "./constants/constants";
import { MonthDetails } from "./screens/MonthDetailsScreen/monthDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(true);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (dbInitialized) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <ExpenseContextProvider>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </ExpenseContextProvider>
    </NavigationContainer>
  );
}
