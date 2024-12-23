import { View, Form } from "tamagui";
import { useRouter } from "expo-router";
import { StyledButton, StyledText, showAlert } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "@aurora/blocks";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import i18n from "i18next";
import { useValidateUsernameMutation } from "../hooks";

enum FormFields {
  Username = "username",
  Password = "password",
  PasswordConfirm = "passwordConfirm",
}

const forgetPasswordFormResolver = yup.object().shape({
  [FormFields.Username]: yup.string().required(i18n.t("validation.required")),
  [FormFields.Password]: yup.string().required(i18n.t("validation.required")),
  [FormFields.PasswordConfirm]: yup
    .string()
    .required(i18n.t("Validation.required"))
    .oneOf([yup.ref("password")], i18n.t("Validation.confirmPassword")),
});

type FormValues = yup.InferType<typeof forgetPasswordFormResolver>;

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm({
    resolver: yupResolver(forgetPasswordFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
      [FormFields.PasswordConfirm]: "",
    },
  });

  const { isPending, mutate: validateUsername } = useValidateUsernameMutation({
    onSuccess: (mobileNumber, { username, password }) => {
      router.push({
        pathname: "auth/forget-password-verification",
        params: {
          mobileNumber,
          username,
          password,
        },
      });
    },
    onError(error) {
      showAlert({
        title: "An error has occurred.",
        message: error.response?.data.message as string,
      });
    },
  });

  function handleSubmit(data: FormValues) {
    validateUsername(data);
  }

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <View flex={1} paddingHorizontal="$s" backgroundColor="$white">
          <StyledButton
            variant="outlined"
            borderColor={"$gray9"}
            paddingVertical={"$xs"}
            marginBottom={"$m"}
            width={50}
            icon={<Icon name="arrow-left" color="black" />}
            onPress={() => router.push("auth/login")}
          />

          <StyledText mt={"$4xl"} variant="Heading4xl" color={"$secondary900"} marginBottom="$xl">
            {t("titles.forgotPassword")} {/* Translated title */}
          </StyledText>

          <ControlledField
            fieldName={FormFields.Username}
            type="textInput"
            placeholder={t("placeholders.email")}
            label={t("inputs.email")}
            iconLeft="email"
          />

          <ControlledField
            fieldName={FormFields.Password}
            type="textInput"
            placeholder={t("placeholders.newPassword")}
            label={t("inputs.newPassword")}
            iconLeft="password"
            secureTextEntry
          />
          <ControlledField
            fieldName={FormFields.PasswordConfirm}
            type="textInput"
            placeholder={t("placeholders.confirmNewPassword")}
            label={t("inputs.confirmNewPassword")}
            iconLeft="password"
            secureTextEntry
          />

          <Form.Trigger mt="$auto" asChild>
            <StyledButton isLoading={isPending}>{t("buttons.submit")}</StyledButton>
          </Form.Trigger>
        </View>
      </FormProvider>
    </Form>
  );
};
