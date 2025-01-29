import { useRouter, useLocalSearchParams } from "expo-router";
import { useValidateOtpMutation } from "../hooks";
import { errorHandler } from "@aurora/utils";
import { AuthOtpVerification } from "../components/AuthOtpVerification";

export const RegisterVerificationScreen = () => {
  const params = useLocalSearchParams();
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
    onError: error => errorHandler(error),
  });

  const onSubmit = (otp: string): void => {
    validateOtp({ customerId, otp, stepId });
  };

  return <AuthOtpVerification onSubmit={onSubmit} isPending={isPending} credential={email} />;
};
