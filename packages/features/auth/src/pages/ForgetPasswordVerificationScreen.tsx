import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { AuthOtpVerification } from "../components/AuthOtpVerification";
import { errorHandler } from "@aurora/utils";

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
    onError: error => errorHandler(error),
  });

  const onSubmit = (otp: string): void => {
    forgetPassword({ otp, username, password });
  };

  return <AuthOtpVerification onSubmit={onSubmit} isPending={isPending} credential={email} />;
};
