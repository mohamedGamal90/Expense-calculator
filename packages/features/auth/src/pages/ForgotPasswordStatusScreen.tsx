import { StatusView } from "@aurora/blocks";
import { View } from "@aurora/components";
import { useLocalSearchParams, useRouter } from "expo-router";

export const ForgotPasswordStatusScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { status } = params as {
    status: "success" | "error" | "pending";
  };

  const handleOnSubmit = () => {
    router.push("auth/login");
  };
  return (
    <View flex={1}>
      <StatusView onSubmit={handleOnSubmit} status={status} />
    </View>
  );
};
