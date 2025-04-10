import { Form, StyledButton, StyledText, View } from "@aurora/components";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import * as yup from "yup";
import { OTPInput } from "input-otp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgetPasswordMutation } from "../../../hooks";
import { useRouter, useFocusEffect } from "expo-router";
import { errorHandler } from "@aurora/utils";
import { ControlledField, ResendOtpBtn } from "@aurora/blocks";
import { useCallback, useEffect } from "react";
import { useResendForgetPasswordOTPMutation } from "../../../hooks/useForgetPasswordResendOTP";

enum FormFields {
  OTP = "otp",
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

const resetPasswordSchema = yup.object().shape({
  [FormFields.OTP]: yup
    .string()
    .required(i18n.t("validation.required"))
    .test({
      name: "numberErr",
      message: i18n.t("validation.number"),
      test: value => /^\d+$/.test(value ?? ""),
    })
    .length(6),
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
      message: i18n.t("validation.minErr"),
      test: value => (value?.length ?? 0) >= 8,
    }),
  [FormFields.ConfirmPassword]: yup
    .string()
    .required(i18n.t("validation.required"))
    .oneOf([yup.ref("password")], i18n.t("validation.confirm-password")),
});

type FormValues = yup.InferType<typeof resetPasswordSchema>;

export function ResetPassword({
  username,
  setStep,
}: {
  username: string;
  setStep: (step: "VALIDATE_USERNAME" | "RESET_PASSWORD") => void;
}) {
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

  const { mutate: resendOTP } = useResendForgetPasswordOTPMutation({
    onError: error => errorHandler(error),
  });

  function handleSubmit({ otp, password }: FormValues) {
    forgetPassword({ otp, username, password });
  }

  useEffect(() => {
    if (form.formState.touchedFields.password || form.watch("password")) {
      form.trigger("confirmPassword");
    }
  }, [form.watch("password")]);

  useFocusEffect(
    useCallback(() => {
      form.reset();
      return () => {
        setStep("VALIDATE_USERNAME");
      };
    }, []),
  );

  return (
    <Form flex={1} onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <View py={"$base"}>
          <StyledText variant="BodyBoldm" marginBottom="$s">
            OTP
          </StyledText>
          <StyledText variant="Bodym" marginBottom="$s">
            If an account with this username exists, a verification code will be sent to your email.
          </StyledText>
          <View justifyContent="center" alignItems="center">
            <Controller
              name={FormFields.OTP}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <>
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
                  <View h="$s">
                    <StyledText pt={"$s"} variant="Bodym" color="$error500">
                      {error?.message}
                    </StyledText>
                  </View>
                </>
              )}
            />
          </View>
          <ResendOtpBtn onPress={() => resendOTP({ username })} />
        </View>
        <ControlledField
          fieldName={FormFields.Password}
          type="textInput"
          placeholder={t("placeholders.newPassword")}
          label={t("inputs.newPassword")}
          iconLeft="password"
          secureTextEntry
          maxLength={20}
        />
        <ControlledField
          fieldName={FormFields.ConfirmPassword}
          type="textInput"
          placeholder={t("placeholders.confirmNewPassword")}
          label={t("inputs.confirmNewPassword")}
          iconLeft="password"
          secureTextEntry
          maxLength={20}
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
