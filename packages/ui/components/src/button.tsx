import { Button, styled } from "tamagui";

export const StyledButton = styled(Button, {
  unstyled: true,
  borderRadius: "$m",
  paddingVertical: "$m",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  color: "$white",
  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary500",
        borderColor: "$transparent",
        hoverStyle: {
          backgroundColor: "$primary600",
        },
        pressStyle: {
          backgroundColor: "$primary600",
        },
      },
      secondary: {
        backgroundColor: "$gray50",
        borderWidth: 1,
      },
      iconBtn: {
        backgroundColor: "$black",
        borderWidth: 1,
        borderRadius: 5,
        hoverStyle: {
          backgroundColor: "$secondary500",
        },
        pressStyle: {
          backgroundColor: "$secondary800",
        },
      },
      negative: {
        backgroundColor: "$negative500",
        pressStyle: {
          backgroundColor: "$negative600",
        },
      },
      outlined: {
        backgroundColor: "$transparent",
        borderColor: "$transparent",
      },
    },
    disabled: {
      true: {
        backgroundColor: "$secondary100",
        color: "$secondary700",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
} as const);

