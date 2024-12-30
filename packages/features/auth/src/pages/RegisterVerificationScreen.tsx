import { Verification } from "@aurora/blocks";
import { View, showAlert } from "@aurora/components";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useValidateOtpMutation } from "../hooks";
import { useTranslation } from "react-i18next";

export const RegisterVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();

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

  const handleOnSubmit = (otp: string) => {
    validateOtp({
      customerId,
      otp,
      stepId,
    });
  };

  return (
    <View flex={1}>
      <Verification
        onSubmit={otp => handleOnSubmit(otp)}
        isPending={isPending}
        credential={email}
        type="email"
      />
    </View>
  );
};
