import { RootView, StyledButton, StyledText } from "@aurora/components";
import { SC_HEIGHT, SC_Width } from "@aurora/utils";
import { ReactElement } from "react";
import { Dialog, View } from "tamagui";
import { useIsRtl } from "@metroid/hooks";

type Props = { title: string; icon: JSX.Element; children: ReactElement };
export const StyledDialog = ({ title, icon, children }: Props) => {
  const isRtl = useIsRtl();
  const positionX = isRtl ? SC_Width - 620 : 20;
  const startX = isRtl ? -1000 : 1000;

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
        <View alignItems="center">
          <StyledButton
            variant="iconBtn"
            paddingVertical={"$xs"}
            marginBottom={"$m"}
            width={50}
            icon={icon}
          />
          <StyledText
            color={"$secondary900"}
            variant={SC_Width > 600 ? "BodySemiBoldm" : "BodySemiBolds"}>
            {title}
          </StyledText>
        </View>
      </Dialog.Trigger>

      <Dialog.Portal paddingVertical={"$m"} alignItems="flex-end">
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          backgroundColor={"$white"}
          opacity={0.86}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          right
          key="content"
          width={SC_Width > 700 ? 600 : "100%"}
          paddingBottom={"$l"}
          paddingHorizontal={"$ml"}
          height={SC_Width > 700 ? "100%" : SC_HEIGHT}
          marginHorizontal={SC_Width > 700 ? positionX : 0}
          borderRadius={"$s"}
          borderWidth={0}
          shadowColor={"$secondary900"}
          shadowOffset={{ width: 1, height: 1 }}
          shadowOpacity={0.6}
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: startX, y: 0, opacity: 0, scale: 1 }}
          exitStyle={{ x: startX, y: 0, opacity: 0, scale: 1 }}>
          <RootView>{children}</RootView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
