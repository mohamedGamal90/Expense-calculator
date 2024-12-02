import { StyledButton } from "@aurora/components";

export const ControlIndexBtn = ({ ...props }) => (
  <StyledButton
    {...props}
    variant="iconBtn"
    position="absolute"
    backgroundColor="$secondary800"
    height={30}
    width={35}
    zIndex={100}
  />
);
