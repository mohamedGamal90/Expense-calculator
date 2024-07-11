import React, { useContext } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";

import { ExpenseContext } from "../store/context/expense-context";
// import { insertExpenses } from "../dataBase/databse";
import { COLORS, styleNumber } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";

const AddExpense = () => {
  const expenseCTX = useContext(ExpenseContext);
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data:FieldValues) => {
    expenseCTX.addExpense(data);
    // await insertExpenses(form);
    navigate("HomeScreen" as never);
  };

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, COLORS.black]}
      style={styles.container}
    >
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Name"
            value={value}
            onChangeText={onChange}
            maxLength={20}
            style={styles.textInput}
          />
        )}
        name="name"
        rules={{ required: "Name is required" }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <SelectDropdown
            buttonStyle={styles.selectListbuttonStyle}
            data={["income", "expense"]}
            onSelect={onChange}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
          />
        )}
        name="type"
        rules={{ required: "Type is required" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Amount"
            maxLength={6}
            style={styles.textInput}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="amount"
        rules={{ required: "Amount is required" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange } }) => (
          <SelectDropdown
            buttonStyle={styles.selectListbuttonStyle}
            data={[
              "subscriptions",
              "Transportation",
              "consumables",
              "medice",
              "other",
            ]}
            onSelect={onChange}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
          />
        )}
        name="category"
        rules={{ required: "Amount is required" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.textInput}
            placeholder="description"
            value={value}
            onChangeText={onChange}
          />
        )}
        name="description"
        defaultValue=""
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.SubmitButton}
      >
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
