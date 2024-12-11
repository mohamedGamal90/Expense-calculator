import { styled, View, type GetProps } from "tamagui";
import { StyledText, type StyledTextProps } from "./text";

const PillFrame = styled(View, {
  paddingHorizontal: "$space.m",
  paddingVertical: "$space.xxs",
  alignSelf: "flex-start",
  borderRadius: "$radius.s",
  variants: {
    variant: {
      success: {
        backgroundColor: "$success100",
      },
      warning: {
        backgroundColor: "$warning100",
      },
      negative: {
        backgroundColor: "$error100",
      },
    },
  },
});

type PillProps = GetProps<typeof PillFrame>;

type Override<Type, NewType extends { [key in keyof Type]?: NewType[key] }> = Omit<
  Type,
  keyof NewType
> &
  NewType;

export type PillVariant = "success" | "warning" | "negative";
function PillText({
  variant,
  ...props
}: Override<
  StyledTextProps,
  {
    variant?: PillVariant;
  }
>) {
  const color = (() => {
    switch (variant) {
      case "success":
        return "$success500";
      case "warning":
        return "$warning500";
      case "negative":
        return "$error500";
      default:
        return "$gray900";
    }
  })();

  return <StyledText variant="Bodysm" color={color} {...props} />;
}

export function Pill(props: PillProps) {
  return (
    <PillFrame {...props} justifyContent="center" alignItems="center">
      <PillText variant={props.variant}>{props.children}</PillText>
    </PillFrame>
  );
}
