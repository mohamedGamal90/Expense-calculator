import { Alert, Form, StyledButton, StyledText, View } from "@aurora/components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ControlledField } from "@aurora/blocks";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useRegisterCustomerMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { errorHandler } from "@aurora/utils";

enum FormFields {
  Username = "username",
  Password = "password",
  PasswordConfirm = "passwordConfirm",
}

const customerRegisterFormResolver = yup.object().shape({
  [FormFields.Username]: yup.string().required(i18n.t("validation.required")),
  [FormFields.Password]: yup
    .string()
    .required(i18n.t("validation.required"))
    .test({
      name: "lowercaseErr",
      message: i18n.t("validation.lowercaseErr"),
      test: value => /[a-z]/.test(value ?? ""),
    })
    .test({
      name: "uppercaseErr",
      message: i18n.t("validation.uppercaseErr"),
      test: value => /[A-Z]/.test(value ?? ""),
    })
    .test({
      name: "numberErr",
      message: i18n.t("validation.numberErr"),
      test: value => /\d/.test(value ?? ""),
    })
    .test({
      name: "specialErr",
      message: i18n.t("validation.specialErr"),
      test: value => /[@$!%*?&#+^]/.test(value ?? ""),
    })
    .test({
      name: "minErr",
      message: i18n.t("Validation.minErr"),
      test: value => (value?.length ?? 0) >= 8,
    }),
  [FormFields.PasswordConfirm]: yup
    .string()
    .required(i18n.t("validation.required"))
    .oneOf([yup.ref("password")], i18n.t("validation.confirm-password")),
});

type FormValues = yup.InferType<typeof customerRegisterFormResolver>;

export const CustomerRegistrationScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams();

  const { customerId, stepId } = params as {
    customerId: string;
    stepId: string;
  };

  const form = useForm({
    resolver: yupResolver(customerRegisterFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
      [FormFields.PasswordConfirm]: "",
    },
  });

  const { mutate, isPending } = useRegisterCustomerMutation({
    onSuccess: () =>
      router.push({
        pathname: "/auth/status",
        params: {
          status: "success",
        },
      }),
    onError: error => errorHandler(error),
  });

  function handleLogin(data: FormValues) {
    mutate({ ...data, customerId, stepId });
  }
  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleLogin)}>
      <Alert />
      <FormProvider {...form}>
        <View gap="$xl">
          <View>
            <StyledText mb="$s" variant="Heading5xl">
              {"Create a new account"}
            </StyledText>

            <StyledText mb="$xl" variant="BodySemiBoldm">
              {"Creat Credentials to access your account"}
            </StyledText>

            <ControlledField
              fieldName={FormFields.Username}
              type="textInput"
              placeholder={"Enter New Username"}
              label={"New Username"}
              iconLeft="email"
            />

            <ControlledField
              fieldName={FormFields.Password}
              type="textInput"
              placeholder={"Enter New Password"}
              label={"New Password"}
              secureTextEntry
              iconLeft="password"
            />

            <ControlledField
              fieldName={FormFields.PasswordConfirm}
              type="textInput"
              placeholder={t("placeholders.confirmNewPassword")}
              label={t("inputs.confirmNewPassword")}
              iconLeft="password"
              secureTextEntry
            />

            <Form.Trigger mt="$m" asChild>
              <StyledButton isLoading={isPending}>{t("buttons.submit")}</StyledButton>
            </Form.Trigger>

            <View w={"100%"} alignItems="center">
              <View
                flexDirection="row"
                mt="$l"
                paddingBottom={"$m"}
                gap={"$space.sm"}
                alignItems="center">
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
                <StyledText>{t("titles.or")}</StyledText>
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
              </View>
              <StyledText mb={"$m"} color={"$secondary900"} variant="BodySemiBoldsm">
                {"Already have an account?"}{" "}
                <StyledText
                  cursor="pointer"
                  variant="BodyBoldml"
                  color={"$primary800"}
                  onPress={() => router.push("/auth/login")}>
                  {t("titles.login")}
                </StyledText>
              </StyledText>
            </View>
          </View>
        </View>
      </FormProvider>
    </Form>
  );
};
