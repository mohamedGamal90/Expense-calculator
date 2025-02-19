import { Alert, Form, StyledButton, StyledText, View } from "@aurora/components";
import { Link } from "expo-router";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { errorHandler, setValue, StoreKey } from "@aurora/utils";
import { ControlledField } from "@aurora/blocks";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

enum FormFields {
  Username = "username",
  Password = "password",
}

export function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const loginFormResolver = yup.object().shape({
    [FormFields.Username]: yup.string().required(i18n.t("validation.required")),
    [FormFields.Password]: yup.string().required(i18n.t("validation.required")),
  });
  type FormValues = yup.InferType<typeof loginFormResolver>;

  const form = useForm({
    resolver: yupResolver(loginFormResolver),
    defaultValues: {
      [FormFields.Username]: "",
      [FormFields.Password]: "",
    },
  });

  const { mutate, isPending } = useLoginMutation({
    onError: error => errorHandler(error),
    async onSuccess(data) {
      await setValue(StoreKey.AccessToken, data.access_token);
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
          <View>
            <StyledText variant="Heading2xl" $gtMd={{ variant: "Heading3xl" }} pb="$l">
              {t("titles.login")}
            </StyledText>
            <StyledText mb="$xs" variant="Heading2xl" $gtMd={{ variant: "Heading5xl" }}>
              {t("titles.welcome")}
            </StyledText>

            <StyledText mb="$xl" variant="BodySemiBolds" $gtMd={{ variant: "BodySemiBoldm" }}>
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
              <StyledText col="$primary800" padding="$space.s" variant="BodySemiBoldsm">
                {t("buttons.forgotPassword")}
              </StyledText>
            </Link>
            <Form.Trigger mt="$m" asChild>
              <StyledButton isLoading={isPending}>{t("buttons.login")}</StyledButton>
            </Form.Trigger>
            <View w="100%" alignItems="center">
              <View fd="row" mt="$l" pb="$m" gap={"$space.sm"} alignItems="center">
                <View h="1px" w="100px" bg="$neutral900"></View>
                <StyledText>{t("titles.or")}</StyledText>
                <View h="1px" w="100px" bg="$neutral900"></View>
              </View>
              <StyledText variant="BodySemiBoldsm" mb="$m" col="$secondary900">
                {t("titles.noAccount")}
                <StyledText
                  cursor="pointer"
                  variant="BodyBoldml"
                  col="$primary800"
                  onPress={() => router.push("/auth/register")}>
                  {t("titles.signUp")}
                </StyledText>
              </StyledText>
            </View>
          </View>
        </View>
      </FormProvider>
    </Form>
  );
}
