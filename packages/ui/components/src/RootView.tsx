import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, ViewProps } from "tamagui";

export const RootView = ({
  children,
  ...props
}: PropsWithChildren & ViewProps) => {
  const { top } = useSafeAreaInsets();
  return (
    <View marginTop={top} {...props}>
      {children}
    </View>
  );
};
