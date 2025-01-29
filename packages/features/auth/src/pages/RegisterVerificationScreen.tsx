import { showAlert } from "@aurora/components";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useValidateOtpMutation } from "../hooks";
import { useTranslation } from "react-i18next";
import { AuthOtpVerification } from "../components/AuthOtpVerification";

export const RegisterVerificationScreen = () => {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const router = useRouter();

  const { customerId, stepId, email } = params as {
    email: string;
    customerId: string;
    stepId: string;
  };

  const { isPending, mutate: validateOtp } = useValidateOtpMutation({
    onSuccess: data =>
      router.push({
        pathname: "auth/customer-register",
        params: {
          customerId,
          stepId: data.stepId,
        },
      }),
    onError: error =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      }),
  });

  const onSubmit = (otp: string): void => {
    validateOtp({ customerId, otp, stepId });
  };

  return <AuthOtpVerification onSubmit={onSubmit} isPending={isPending} credential={email} />;
};
