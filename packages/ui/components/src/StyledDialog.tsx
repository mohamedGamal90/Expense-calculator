import { StyledButton, StyledText } from "@aurora/components";
import { ReactElement } from "react";
import { Dimensions } from "react-native";
import { Dialog, View } from "tamagui";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
type Props = { title: string; icon: JSX.Element; children: ReactElement };
export const StyledDialog = ({ title, icon, children }: Props) => (
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
          variant={screenWidth > 600 ? "BodySemiBoldm" : "BodySemiBolds"}>
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
        key="content"
        width={screenWidth > 700 ? 600 : "100%"}
        paddingVertical={"$l"}
        paddingHorizontal={"$ml"}
        height={screenWidth > 700 ? "100%" : screenHeight}
        marginHorizontal={screenWidth > 700 ? "$l" : 0}
        borderRadius={"$s"}
        borderWidth={0}
        shadowColor={"$secondary900"}
        shadowOffset={{ width: 1, height: 1 }}
        shadowOpacity={0.6}
        animateOnly={["transform", "opacity"]}
        animation={["tooltip", { opacity: { overshootClamping: true } }]}
        enterStyle={{ x: 1000, y: 0, opacity: 0, scale: 1 }}
        exitStyle={{ x: 1000, y: 0, opacity: 0, scale: 1 }}>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog>
);
