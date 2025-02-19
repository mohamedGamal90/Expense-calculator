import { Form, StyledButton, StyledText, View } from "@aurora/components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n, { use } from "i18next";
import * as yup from "yup";
import { OTPInput } from "input-otp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgetPasswordMutation } from "../../../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { errorHandler } from "@aurora/utils";
import { ControlledField } from "@aurora/blocks";

enum FormFields {
  OTP = "otp",
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

const resetPasswordSchema = yup.object().shape({
  [FormFields.OTP]: yup.string().required(i18n.t("validation.required")).length(6),
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
  [FormFields.ConfirmPassword]: yup
    .string()
    .required(i18n.t("validation.required"))
    .oneOf([yup.ref("password")], i18n.t("validation.confirm-password")),
});

type FormValues = yup.InferType<typeof resetPasswordSchema>;

export function ResetPassword({ username }: { username: string }) {
  const { t } = useTranslation();

  const router = useRouter();

  const form = useForm({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      [FormFields.OTP]: "",
      [FormFields.Password]: "",
      [FormFields.ConfirmPassword]: "",
    },
    mode: "onChange",
  });

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () =>
      router.push({
        pathname: "auth/status",
        params: {
          status: "success",
          statusMessage: t("forget-password.success-msg"),
        },
      }),
    onError: error => errorHandler(error),
  });

  function handleSubmit({ otp, password }: FormValues) {
    forgetPassword({ otp, username, password });
  }

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <View py={"$base"}>
          <StyledText variant="BodyBoldm" marginBottom="$s">
            OTP
          </StyledText>
          <Controller
            name={FormFields.OTP}
            render={({ field: { onChange } }) => (
              <OTPInput
                maxLength={6}
                onChange={onChange}
                inputMode="numeric"
                render={({ slots }) => (
                  <View flexDirection="row">
                    {slots.map((slot, index) => (
                      <View
                        key={index}
                        $xs={{ h: 35, w: 35, mr: "$s" }}
                        jc="center"
                        ai="center"
                        bc={slot.isActive ? "$secondary800" : "$secondary300"}
                        br="$s"
                        bw={2}
                        mr="$m"
                        h={40}
                        w={40}>
                        {slot.char !== null && (
                          <StyledText col="$secondary800">{slot.char}</StyledText>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              />
            )}
          />
        </View>
        <ControlledField
          fieldName={FormFields.Password}
          type="textInput"
          placeholder={t("placeholders.newPassword")}
          label={t("inputs.newPassword")}
          iconLeft="password"
          secureTextEntry
        />
        <ControlledField
          fieldName={FormFields.ConfirmPassword}
          type="textInput"
          placeholder={t("placeholders.confirmNewPassword")}
          label={t("inputs.confirmNewPassword")}
          iconLeft="password"
          secureTextEntry
        />
        <Form.Trigger mt="$m" asChild>
          <StyledButton disabled={!form.formState.isValid || isPending} isLoading={isPending}>
            {t("buttons.submit")}
          </StyledButton>
        </Form.Trigger>
      </FormProvider>
    </Form>
  );
}
