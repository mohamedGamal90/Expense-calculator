import { useRouter, useLocalSearchParams } from "expo-router";
import type { RelativePathString } from "expo-router/build/types";
import { useValidateOtpMutation } from "../hooks";
import { showAlert } from "@aurora/components";
import { UseRegistrationResendOtpMutation } from "../hooks";
import { useTranslation } from "react-i18next";
import { AuthOtpVerification } from "../components/AuthOtpVerification";
import { errorHandler } from "@aurora/utils";
import { useState } from "react";

export const RegisterVerificationScreen = () => {
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const [otpError, setOtpError] = useState("");
  const router = useRouter();

  const { customerId, stepId, email } = params as {
    email: string;
    customerId: string;
    stepId: string;
  };

  const { isPending, mutate: validateOtp } = useValidateOtpMutation({
    onSuccess: data =>
      router.push({
        pathname: "auth/customer-register" as RelativePathString,
        params: {
          customerId,
          stepId: data.stepId,
        },
      }),
    onError: error => {
      const errorMsg = error?.response?.data?.message;
      if (errorMsg === "invalid otp" || errorMsg === "Expired otp") {
        setOtpError(errorMsg);
        setTimeout(() => setOtpError(""), 5000);
        return;
      }
      router.push({
        pathname: "/auth/status",
        params: {
          status: "error",
          statusMessage: errorMsg,
        },
      });
    },
  });

  const { mutateAsync: ResendOTP } = UseRegistrationResendOtpMutation({
    onError: () =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("otp.max-resend-otp-reached-msg"),
      }),
  });

  const onSubmit = (otp: string): void => {
    validateOtp({ customerId, otp, stepId });
  };

  const onResendOtp = () => {
    ResendOTP({ customerId }).catch(error => errorHandler(error));
  };

  return (
    <AuthOtpVerification
      onSubmit={onSubmit}
      isPending={isPending}
      credential={email}
      onResendOtp={onResendOtp}
      otpError={otpError}
    />
  );
};
