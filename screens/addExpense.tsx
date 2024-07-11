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

const AddExpense = () => {
  const expenseCTX = useContext(ExpenseContext);
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
              style={[styles.textInput,styles.formField]}
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
            buttonStyle={[styles.selectListbuttonStyle,styles.formField]}
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
              style={[styles.textInput,styles.formField]}
              value={value}
              onChangeText={onChange}
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
              buttonStyle={[styles.selectListbuttonStyle,styles.formField]}
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
              style={[styles.textInput,styles.formField]}
              placeholder="description"
              value={value}
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

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectListbuttonStyle: {
    width: "85%",
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: COLORS.white,
  },
  formField:{
    backgroundColor: COLORS.formBlack,
    margin: 10,
    borderBottomWidth: 3,
    fontSize: fontSizes.labelFont,
    borderColor: COLORS.neongreen2,
    borderTopEndRadius: styleNumber.borderRadius,
    borderTopStartRadius: styleNumber.borderRadius,
  }
});
