import React, { useContext, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";

import { ExpenseContext } from "../store/context/expense-context";
import { insertExpenses } from "../dataBase/databse";
import { COLORS, styleNumber } from "../constants/constants";

const AddExpense = ({ navigation }: any) => {
  const expenseCTX = useContext(ExpenseContext);

  const [form, setForm] = useState({
    name: "",
    type: "",
    amount: 0,
    category: "",
    description: "",
  });

  const submitForm = async () => {
    if (form.name && form.type && form.category && form.amount >= 1) {
      expenseCTX.addExpense(form);
      await insertExpenses(form);
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert(
        "invalid Form Input",
        "Make sure to add a name, type, category, valid amount ",
        [
          {
            text: "OK",
            onPress: () => console.log("cancel"),
          },
        ]
      );
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, "black"]}
      style={styles.container}
    >
      <TextInput
        placeholder="Name"
        maxLength={20}
        style={styles.textInput}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <SelectDropdown
        buttonStyle={styles.selectListbuttonStyle}
        data={["income", "expense"]}
        onSelect={(selectedItem) => {
          setForm({ ...form, type: selectedItem });
        }}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
      />
      <TextInput
        keyboardType="decimal-pad"
        placeholder="Amount"
        maxLength={6}
        style={styles.textInput}
        onChangeText={(number) => setForm({ ...form, amount: +number })}
      />
      <SelectDropdown
        buttonStyle={styles.selectListbuttonStyle}
        data={[
          "subscriptions",
          "Transportation",
          "consumables",
          "medice",
          "other",
        ]}
        onSelect={(selectedItem) => {
          setForm({ ...form, category: selectedItem });
        }}
        buttonTextAfterSelection={(selectedItem) => selectedItem}
        rowTextForSelection={(item) => item}
      />
      <TextInput
        multiline={true}
        numberOfLines={5}
        style={styles.textInput}
        placeholder="description"
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <TouchableOpacity onPress={submitForm} style={styles.SubmitButton}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectListbuttonStyle: {
    width: "85%",
    borderRadius: styleNumber.borderRadius,
    backgroundColor: COLORS.white,
    margin: 10,
    fontSize: 20,
  },
  textInput: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 10,
    borderRadius: styleNumber.borderRadius,
    width: "85%",
    fontSize: 20,
  },
  SubmitButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: styleNumber.borderRadius,
    backgroundColor: COLORS.neongreen2,
    marginTop: 10,
    width: "85%",
  },
});
