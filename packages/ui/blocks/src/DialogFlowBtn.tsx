import { Dialog, getTokens, StyledButton } from "@aurora/components";
import { Icon } from "@aurora/icons";

export const DialogFlowBtn = ({ close, onPress }: { close: boolean; onPress?: () => void }) => {
  const { color } = getTokens();

  switch (close) {
    case true:
      return (
        <Dialog.Close asChild>
          <StyledButton
            position="absolute"
            variant="iconBtn"
            width={40}
            height={40}
            icon={<Icon name="close-circle" color={color.error600.val} />}
            borderWidth={0}
            right={0}
            zIndex={100}
            top={5}
          />
        </Dialog.Close>
      );
    case false:
      return (
        <StyledButton
          position="absolute"
          variant="iconBtn"
          borderWidth={0}
          width={40}
          height={26}
          onPress={onPress}
          left={0}
          zIndex={100}
          top={7}
          icon={<Icon name="arrow-left" color={color.black.val} />}
        />
      );
  }
};
