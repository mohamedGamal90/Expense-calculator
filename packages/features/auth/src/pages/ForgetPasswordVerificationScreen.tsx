import { View, showAlert } from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Verification } from "@aurora/blocks";

export const ForgetPasswordVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { password, username, email, phoneNumber } = params as {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () => {
      router.push("auth/forgot-password-status");
    },
    onError(error) {
      showAlert({
        title: "An error has occurred.",
        message: error.response?.data.message as string,
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
      />
    </View>
  );
};
