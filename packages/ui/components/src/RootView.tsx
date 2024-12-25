import { PropsWithChildren } from "react";
import { View, ViewProps } from "tamagui";
import { useIsRtl } from "@metroid/hooks";

interface RootViewProps extends ViewProps {
  dir?: "rtl" | "ltr";
}

export const RootView = ({ children, ...props }: PropsWithChildren<RootViewProps>) => {
  const isRtl = useIsRtl();

  return (
    <View flex={1} dir={isRtl ? "rtl" : "ltr"} {...props}>
      {children}
    </View>
  );
};
