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

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const forgetPasswordFormResolver = yup.object().shape({
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
        test: value => /[@$!%*?&]/.test(value ?? ""),
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

  type FormValues = yup.InferType<typeof forgetPasswordFormResolver>;

  const form = useForm({
    resolver: yupResolver(forgetPasswordFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
      [FormFields.PasswordConfirm]: "",
    },
  });

  const { isPending, mutate: validateUsername } = useValidateUsernameMutation({
    onSuccess: (data, { username, password }) => {
      router.push({
        pathname: "auth/forget-password-verification",
        params: {
          email: data.email,
          phoneNumber: data.phoneNumber,
          username,
          password,
        },
      });
      form.reset();
    },
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  function handleSubmit(data: FormValues) {
    validateUsername(data);
  }

  const disabled = !(
    form.watch().username.length > 0 &&
    form.watch().password.length > 0 &&
    form.watch().passwordConfirm.length > 0
  );

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <View f={1} paddingHorizontal="$s" bg="$white">
          <StyledButton
            variant="outlined"
            bc="$gray9"
            py="$xs"
            mb="$s"
            w={50}
            icon={<Icon name="arrow-left" color="black" />}
            onPress={() => router.push("auth/login")}
          />

          <StyledText
            variant="Heading2xl"
            mt="$l"
            $gtMd={{ variant: "Heading5xl" }}
            col="$secondary900"
            mb="$l">
            {t("titles.forgotPassword")} {/* Translated title */}
          </StyledText>

          <ControlledField
            fieldName={FormFields.Username}
            type="textInput"
            placeholder={t("placeholders.username")}
            label={t("inputs.username")}
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

          <Form.Trigger mt="$m" asChild>
            <StyledButton disabled={disabled} isLoading={isPending}>
              {t("buttons.submit")}
            </StyledButton>
          </Form.Trigger>
        </View>
      </FormProvider>
    </Form>
  );
};
