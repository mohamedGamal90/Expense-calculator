import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "./ControlledField";
import { View, ScrollView, ViewStyle, Form, InputProps } from "tamagui";
import * as yup from "yup";
import { FieldType } from "./types";
import { IconKeys } from "@aurora/icons";
import { StyledButton } from "@aurora/components";

export type FieldItem = InputProps & {
  fieldName: string;
  label?: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  validation?: yup.AnySchema;
  layout?: "row" | "column";
  defaultValue?: string;
  containerStyle?: ViewStyle;
  type?: FieldType;
  iconLeft?: IconKeys;
  iconRight?: IconKeys;
  secureTextEntry?: boolean;
  renderBefore?: () => JSX.Element;
  renderAfter?: () => JSX.Element;
};
export type FieldGroupType = {
  layout: "rowGroup";
  fields: FieldItem[];
};

type FormContainerProps = {
  fields: (FieldItem | FieldGroupType)[];
  isLoading?: boolean;
  btnText?: string;
  onSubmit: SubmitHandler<Record<string, any>>;
};

const generateValidationSchema = (fields: (FieldItem | FieldGroupType)[]) => {
  const schemaFields: Record<string, yup.AnySchema> = {};
  fields.forEach(field => {
    if ("fields" in field) {
      field.fields.forEach(groupField => {
        if (groupField.validation) {
          schemaFields[groupField.fieldName] = groupField.validation;
        }
      });
    } else {
      if (field.validation) {
        schemaFields[field.fieldName] = field.validation;
      }
    }
  });
  return yup.object().shape(schemaFields);
};

export const FormContainer: React.FC<FormContainerProps> = ({
  fields,
  btnText = "Submit",
  isLoading,
  onSubmit,
}) => {
  const validationSchema = generateValidationSchema(fields);

  const formMethods = useForm({
    mode: "onSubmit",

    resolver: yupResolver(validationSchema),
    defaultValues: fields.reduce(
      (acc, field) => {
        if ("fields" in field) {
          (field.fields as FieldItem[]).forEach(groupField => {
            acc[groupField.fieldName] = groupField.defaultValue || "";
          });
        } else {
          acc[field.fieldName] = field.defaultValue || "";
        }
        return acc;
      },
      {} as Record<string, any>,
    ),
  });

  const isValid = formMethods.formState.isValid;

  const handleFormSubmit: SubmitHandler<Record<string, any>> = data => {
    onSubmit(data);
    formMethods.reset(); // Reset the form after submission
  };

  return (
    <Form onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
      <FormProvider {...formMethods}>
        <ScrollView scrollEnabled={false} automaticallyAdjustKeyboardInsets>
          {fields.map((field, index) =>
            "fields" in field ? (
              <View
                key={index}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                marginBottom="$2xl"
                gap={10}>
                {(field.fields as FieldItem[]).map(groupField => (
                  <ControlledField
                    key={groupField.fieldName}
                    containerStyle={{ flex: 1, flexBasis: 100 / fields.length }}
                    {...groupField}
                  />
                ))}
              </View>
            ) : (
              <ControlledField key={field.fieldName} {...field} />
            ),
          )}

          <Form.Trigger asChild marginTop="$2xl">
            <StyledButton variant={"primary"}>{btnText}</StyledButton>
          </Form.Trigger>
        </ScrollView>
      </FormProvider>
    </Form>
  );
};
