import React, { useContext } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import { ScrollView, StyleSheet, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";

import { ExpenseContext } from "../store/context/expense-context";
// import { insertExpenses } from "../dataBase/databse";
import { COLORS, fontSizes, styleNumber } from "../constants/constants";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";

export const ExpenseForm = () => {
  const expenseCTX = useContext(ExpenseContext);
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    expenseCTX.addExpense(data);
    // await insertExpenses(form);
    navigate("HomeScreen" as never);
  };

  return (
    <LinearGradient
      colors={[COLORS.neonGrey, COLORS.black]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          width: "100%",
          margin: 10,
        }}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
      >
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              maxLength={20}
              style={[styles.textInput, styles.formField]}
              placeholderTextColor={COLORS.white}
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
              buttonStyle={[styles.DropdownButtonStyle, styles.formField]}
              buttonTextStyle={styles.DropdownButtonTextStyle}
              dropdownStyle={styles.DropdownStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
              rowStyle={styles.DropdownRowStyle}
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
              style={[styles.textInput, styles.formField]}
              value={value}
              onChangeText={(amount)=>onChange(+amount)}
              placeholderTextColor={COLORS.white}
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
              buttonStyle={[styles.DropdownButtonStyle, styles.formField]}
              buttonTextStyle={styles.DropdownButtonTextStyle}
              dropdownStyle={styles.DropdownStyle}
              rowTextStyle={styles.DropdownRowTextStyle}
              rowStyle={styles.DropdownRowStyle}
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
          rules={{ required: "Category is required" }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline={true}
              style={[styles.textInput, styles.formField]}
              placeholder="Description"
              value={value}
              numberOfLines={5}
              onChangeText={onChange}
              placeholderTextColor={COLORS.white}
            />
          )}
          name="description"
          defaultValue=""
        />
      </ScrollView>
      <Button
        onPress={handleSubmit(onSubmit)}
        btnPlaceHolder={"Submit"}
        disabled={!isValid}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingHorizontal: 17,
    paddingVertical: 15,
    color: COLORS.white,
  },
  formField: {
    backgroundColor: COLORS.formBlack,
    margin: 10,
    borderBottomWidth: 3,
    fontSize: fontSizes.labelFont,
    borderColor: COLORS.neongreen2,
    borderTopEndRadius: styleNumber.borderRadius,
    borderTopStartRadius: styleNumber.borderRadius,
  },
  DropdownButtonStyle: {
    width: "85%",
  },
  DropdownButtonTextStyle: {
    color: COLORS.white,
    textAlign: "left",
    fontSize: fontSizes.labelFont,
  },
  DropdownStyle: {
    backgroundColor: COLORS.formBlack,
    borderBottomEndRadius: styleNumber.borderRadius,
    borderBottomStartRadius: styleNumber.borderRadius,
  },
  DropdownRowTextStyle: {
    color: COLORS.white,
  },
  DropdownRowStyle: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
});
