import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";

import HomeScreen from "./screens/homeScreen";
import AddExpense from "./screens/addExpense";
import ExpenseContextProvider from "./store/context/expense-context";
import MonthDetails from "./screens/monthDetails";
import { init } from "./dataBase/databse";
import { COLORS } from "./constants/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="auto" />
      <ExpenseContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: COLORS.neonGrey },
              headerTintColor: "black",
              headerShadowVisible: false,
              animation: "fade_from_bottom",
            }}
          >
            <Stack.Screen
              options={{ title: "" }}
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen name="AddExpenseScreen" component={AddExpense} />
            <Stack.Screen name="MonthDetailsScreen" component={MonthDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpenseContextProvider>
    </>
  );
}
