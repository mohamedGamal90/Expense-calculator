import { View } from "@aurora/components";
import { useForgetPasswordMutation } from "../hooks";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Verification } from "@aurora/blocks";

export const ForgetPasswordVerificationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { password, username, mobileNumber } = params as {
    username: string;
    password: string;
    mobileNumber: string;
  };

  console.log("password, username, mobileNumber", password, username, mobileNumber);

  const { isPending, mutate: forgetPassword } = useForgetPasswordMutation({
    onSuccess: () => {
      router.push("auth/forgot-password-status");
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
        credential={mobileNumber}
      />
    </View>
  );
};
