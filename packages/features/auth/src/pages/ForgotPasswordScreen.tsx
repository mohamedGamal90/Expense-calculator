import { View, Form } from "tamagui";
import { useRouter } from "expo-router";
import { StyledButton, StyledText } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "@aurora/blocks";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import i18n from "i18next";

enum FormFields {
  Email = "email",
}

const forgetPasswordFormResolver = yup.object().shape({
  [FormFields.Email]: yup
    .string()
    .email(i18n.t("validation.email"))
    .required(i18n.t("validation.required")),
});

type FormValues = yup.InferType<typeof forgetPasswordFormResolver>;

export const ForgotPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const form = useForm({
    resolver: yupResolver(forgetPasswordFormResolver),
    defaultValues: {
      [FormFields.Email]: "",
    },
  });

  function handleSubmit(data: FormValues) {
    router.push("auth/new-password");
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
            fieldName={FormFields.Email}
            type="textInput"
            placeholder={t("placeholders.email")}
            label={t("inputs.email")}
            iconLeft="email"
          />

          <Form.Trigger mt="$auto" asChild>
            <StyledButton>{t("buttons.submit")}</StyledButton>
          </Form.Trigger>
        </View>
      </FormProvider>
    </Form>
  );
};
