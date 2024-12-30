import { View, showAlert } from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Verification } from "@aurora/blocks";
import { useTranslation } from "react-i18next";

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
        },
      }),
    onError: error => {
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("server-error." + error.response?.data.message.toLocaleLowerCase()) as string,
      });
    },
  });

  const handleOnSubmit = (otp: string) => {
    forgetPassword({
      otp,
      username,
      password,
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
