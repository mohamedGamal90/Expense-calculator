import { LogoutButton } from "@aurora/blocks";
import { Dialog, getTokens, RootView, StyledDialog, View } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { SC_HEIGHT, SC_Width } from "@aurora/utils";
import { isRtl } from "@metroid/store";
import { Image } from "expo-image";

export function MobileTopbar() {
  const tokens = getTokens();
  const positionX = isRtl ? SC_Width - 620 : 20;
  const startX = -1000;

  return (
    <View
      $gtSm={{
        display: "none",
      }}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      px="$base"
      py="$m"
      pb={0}>
      <Dialog modal>
        <Dialog.Trigger asChild>
          <View alignItems="center">
            <Icon name="menu" />
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
            left
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
            <RootView>
              <View flexDirection="row" py={"$m"} px="$ml" alignItems="center">
                <View width={"100%"} alignItems="center">
                  <Image
                    source={require("../../../auth/src/components/logo.png")}
                    style={{ width: 120, height: 70 }}
                    contentFit="contain"
                  />
                </View>
                <Dialog.Close asChild>
                  <View>
                    <Icon name="close-circle" color={tokens.color.$error600.val} />
                  </View>
                </Dialog.Close>
              </View>

              <View h={1} backgroundColor={"$secondary200"}></View>

              <LogoutButton />
            </RootView>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      <View alignItems="center">
        <Image
          source={require("../../../auth/src/components/logo.png")}
          style={{ width: 120, height: 70 }}
          contentFit="contain"
        />
      </View>
      <View h={24} w={24}></View>
    </View>
  );
}
