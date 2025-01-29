import { showAlert } from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { AuthOtpVerification } from "../components/AuthOtpVerification";

export const ForgetPasswordVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

  const { password, username, email } = params as {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () =>
      router.push({
        pathname: "auth/status",
        params: {
          status: "success",
          statusMessage: t("forget-password.success-msg"),
        },
      }),
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  const onSubmit = (otp: string): void => {
    forgetPassword({ otp, username, password });
  };

  return <AuthOtpVerification onSubmit={onSubmit} isPending={isPending} credential={email} />;
};
