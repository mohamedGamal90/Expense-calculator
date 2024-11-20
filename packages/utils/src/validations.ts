import * as yup from "yup";

export const validations = {
  email: yup.string().required("First Name is required"),
  password: yup.string().required("Password is required"),
};
