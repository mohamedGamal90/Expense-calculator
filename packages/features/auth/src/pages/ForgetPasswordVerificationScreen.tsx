import { View } from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Verification } from "@aurora/blocks";

export const ForgetPasswordVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { password, username, email } = params as {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
  };

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () =>
      router.push({
        pathname: "auth/forgot-password-status",
        params: {
          status: "success",
        },
      }),
    onError: () =>
      router.push({
        pathname: "auth/forgot-password-status",
        params: {
          status: "error",
        },
      }),
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
