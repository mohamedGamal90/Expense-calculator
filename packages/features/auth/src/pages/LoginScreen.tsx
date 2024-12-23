import { Alert, Form, StyledButton, StyledText, View, showAlert } from "@aurora/components";
import { Link } from "expo-router";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { protectedStore, StoreKey } from "@aurora/utils";
import { ControlledField } from "@aurora/blocks";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

enum FormFields {
  Username = "username",
  Password = "password",
}

const loginFormResolver = yup.object().shape({
  [FormFields.Username]: yup.string().required(i18n.t("validation.required")),
  [FormFields.Password]: yup.string().required(i18n.t("validation.required")),
});

type FormValues = yup.InferType<typeof loginFormResolver>;

export function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const form = useForm({
    resolver: yupResolver(loginFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
    },
  });

  const { mutate, isPending } = useLoginMutation({
    onError(error) {
      showAlert({
        title: "An error has occurred.",
        message: error.response?.data.message as string,
      });
    },
    async onSuccess(data) {
      await protectedStore.setValue(StoreKey.AccessToken, data.access_token);
      router.navigate("/dashboard");
    },
  });

  function handleLogin(data: FormValues) {
    mutate(data);
  }

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleLogin)}>
      <Alert />
      <FormProvider {...form}>
        <View gap="$xl">
          <StyledText variant="Heading4xl">{t("titles.login")}</StyledText>
          <View>
            <StyledText mb="$s" variant="Heading6xl">
              {t("titles.welcome")}
            </StyledText>

            <StyledText mb="$xl" variant="Bodysm">
              {t("titles.instruction")}
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
              placeholder={t("placeholders.password")}
              label={t("inputs.password")}
              secureTextEntry
              iconLeft="password"
            />

            <Link
              style={{
                alignSelf: "flex-end",
                marginTop: -20,
                marginBottom: 20,
              }}
              href={"/auth/forgot-password"}>
              <StyledText color={"$primary800"} padding="$space.s" variant="BodySemiBoldsm">
                {t("buttons.forgotPassword")}
              </StyledText>
            </Link>
            <Form.Trigger mb="$xl" asChild>
              <StyledButton isLoading={isPending}>{t("buttons.login")}</StyledButton>
            </Form.Trigger>
            <View w={"100%"} alignItems="center">
              {/* <View flexDirection="row" paddingBottom={"$m"} gap={"$space.sm"} alignItems="center">
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
                <StyledText>{t("titles.or")}</StyledText>
                <View h={"1px"} w={"100px"} backgroundColor={"$neutral900"}></View>
              </View> */}
              {/* <StyledText mb={"$m"} color={"$secondary900"} variant="BodySemiBoldsm">
                {t("titles.noAccount")}{" "}
                <StyledText variant="BodySemiBoldsm" color={"$primary800"}>
                  {t("titles.signUp")}
                </StyledText>
              </StyledText> */}
            </View>
          </View>
        </View>
      </FormProvider>
    </Form>
  );
}
