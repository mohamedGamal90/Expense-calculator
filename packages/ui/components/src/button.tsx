import { GetProps, View, Text, createStyledContext, styled, withStaticProperties } from "tamagui";

const ButtonContext = createStyledContext({
  variant: "primary",
});

const ButtonFrame = styled(View, {
  name: "Button",
  context: ButtonContext,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "$m",
  paddingVertical: "$m",
  cursor: "pointer",

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary800",
        borderColor: "$transparent",
        hoverStyle: {
          backgroundColor: "$primary600",
        },
        disabledStyle: {
          backgroundColor: "$secondary300",
        },
        pressStyle: {
          backgroundColor: "$primary950",
        },
      },
      iconBtn: {
        borderWidth: 1,
        borderColor: "$secondary800",
        disabledStyle: { opacity: 0.6 },
      },
    },
  } as const,

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = GetProps<typeof ButtonFrame>;

const ButtonText = styled(Text, {
  name: "ButtonText",
  context: ButtonContext,
  userSelect: "none",

  variants: {
    variant: {
      primary: {
        color: "$white",
      },
    },
  } as const,
});

const Button = withStaticProperties(ButtonFrame, {
  Props: ButtonContext.Provider,
  Text: ButtonText,
});

type StyledButtonProps = ButtonProps & {
  icon?: React.ReactNode;
};

export function StyledButton({ children, icon, ...props }: StyledButtonProps) {
  return (
    <Button {...props}>
      {icon}
      <Button.Text>{children}</Button.Text>
    </Button>
  );
}
