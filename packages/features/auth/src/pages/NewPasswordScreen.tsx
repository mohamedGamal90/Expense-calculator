import { StyledButton, StyledText, View } from "@aurora/components";
import { Form } from "tamagui";
import { Icon } from "@aurora/icons";
import { useRouter } from "expo-router";
import type { RelativePathString } from "expo-router/build/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledField } from "@aurora/blocks";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import i18n from "i18next";

enum FormFields {
  Password = "password",
  NewPassword = "new-password",
}

const newPasswordFormResolver = yup.object().shape({
  [FormFields.Password]: yup.string().required(i18n.t("validation.required")),
  [FormFields.NewPassword]: yup.string().required(i18n.t("validation.required")),
});

type FormValues = yup.InferType<typeof newPasswordFormResolver>;

export const NewPasswordScreen = () => {
  const router = useRouter();
  const { t } = useTranslation(); // Initialize translation

  const form = useForm({
    resolver: yupResolver(newPasswordFormResolver),
    defaultValues: {
      [FormFields.Password]: "",
      [FormFields.NewPassword]: "",
    },
  });

  function handleSubmit(data: FormValues) {
    router.push("auth/new-password" as RelativePathString);
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
            onPress={() => router.push("auth/login" as RelativePathString)}
          />
          <StyledText mt={"$4xl"} variant="Heading4xl" color={"$secondary900"} marginBottom="$xl">
            {t("titles.newPassword")} {/* Translated title */}
          </StyledText>
          <ControlledField
            fieldName={FormFields.Password}
            type="textInput"
            placeholder={t("placeholders.password")}
            label={t("inputs.password")}
            iconLeft="password"
            secureTextEntry
          />
          <ControlledField
            fieldName={FormFields.NewPassword}
            type="textInput"
            placeholder={t("placeholders.newPassword")}
            label={t("inputs.newPassword")}
            iconLeft="password"
            secureTextEntry
          />
          <ControlledField
            fieldName={FormFields.NewPassword}
            type="textInput"
            placeholder={t("placeholders.confirmNewPassword")}
            label={t("inputs.confirmNewPassword")}
            iconLeft="password"
            secureTextEntry
          />

          <Form.Trigger mt="$auto" asChild>
            <StyledButton>{t("buttons.submit")}</StyledButton> {/* Translated button */}
          </Form.Trigger>
        </View>
      </FormProvider>
    </Form>
  );
};
