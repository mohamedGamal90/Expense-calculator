import { FieldItem, FieldGroupType } from "@aurora/blocks";
import { validations } from "@aurora/utils";

export const forgotPasswordFields: (FieldItem | FieldGroupType)[] = [
  {
    fieldName: "email",
    placeholder: "Enter your email",
    keyboardType: "email-address",
    validation: validations.email,
    layout: "row",
    iconLeft: "email",
  },
];

export const newPasswordFields: (FieldItem | FieldGroupType)[] = [
  {
    fieldName: "password",
    placeholder: "Enter your New Passowrd",
    keyboardType: "default",
    validation: validations.password,
    layout: "row",
    iconLeft: "password",
    secureTextEntry: true,
  },
  {
    fieldName: "confirm-password",
    placeholder: "Enter your New Passowrd",
    keyboardType: "default",
    validation: validations.password,
    layout: "row",
    iconLeft: "password",
    secureTextEntry: true,
  },
];
