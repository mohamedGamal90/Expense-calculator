import { Alert, Form, StyledButton, StyledText, View, showAlert } from "@aurora/components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { ControlledField } from "@aurora/blocks";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { useRegisterCardNumberMutation } from "../hooks";
import { Icon } from "@aurora/icons";

enum FormFields {
  CardNumber = "cardNumber",
}

const registerFormResolver = yup.object().shape({
  [FormFields.CardNumber]: yup
    .string()
    .required(i18n.t("validation.required"))
    .length(16, i18n.t("validation.length", { length: 16 })),
});

type FormValues = yup.InferType<typeof registerFormResolver>;

export const RegisterScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const form = useForm({
    resolver: yupResolver(registerFormResolver),
    defaultValues: {
      [FormFields.CardNumber]: "",
    },
  });

  const { mutate, isPending } = useRegisterCardNumberMutation({
    onError(error) {
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      });
    },
    async onSuccess(data) {
      router.navigate({
        pathname: "/auth/register-verification",
        params: {
          email: data.email,
          customerId: data.customerId,
          stepId: data.stepId,
        },
      });
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
          <StyledButton
            variant="outlined"
            borderColor={"$gray9"}
            paddingVertical={"$xs"}
            marginBottom={"$s"}
            width={50}
            icon={<Icon name="arrow-left" color="black" />}
            onPress={() => router.push("auth/login")}
          />
          <StyledText variant="Heading5xl">{t("titles.login")}</StyledText>
          <View>
            <StyledText mb="$s" variant="Heading5xl">
              {t("titles.welcome")}
            </StyledText>

            <StyledText mb="$xl" variant="BodySemiBoldm">
              Create credentials to access your account
            </StyledText>

            <ControlledField
              fieldName={FormFields.CardNumber}
              type="textInput"
              placeholder={"0000   0000    0000     0000"}
              label={"Card Number"}
              iconLeft="card"
              maxLength={19}
            />

            <Form.Trigger mt="$m" asChild>
              <StyledButton isLoading={isPending}>{t("buttons.login")}</StyledButton>
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
                {t("titles.noAccount")}{" "}
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
