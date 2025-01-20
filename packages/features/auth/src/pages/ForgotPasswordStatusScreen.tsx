import { StatusView } from "@aurora/blocks";
import { View } from "@aurora/components";
import { useLocalSearchParams, useRouter } from "expo-router";

export const StatusScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { status, statusMessage } = params as {
    status: "success" | "error" | "pending";
    statusMessage: string;
  };

  const handleOnSubmit = () => {
    router.push("auth/login");
  };
  return (
    <View flex={1}>
      <StatusView onSubmit={handleOnSubmit} status={status} statusTitle={statusMessage} />
    </View>
  );
};
