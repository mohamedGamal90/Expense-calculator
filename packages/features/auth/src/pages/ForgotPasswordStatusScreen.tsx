import { StatusView } from "@aurora/blocks";
import { View } from "@aurora/components";
import { useRouter } from "expo-router";

export const ForgotPasswordStatusScreen = () => {
  const router = useRouter();

  const handleOnSubmit = () => {
    router.push("auth/login");
  };
  return (
    <View flex={1}>
      <StatusView onSubmit={handleOnSubmit} />
    </View>
  );
};
