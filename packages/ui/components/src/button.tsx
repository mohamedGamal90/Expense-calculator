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
        backgroundColor: "$primary500",
        borderColor: "$transparent",
        hoverStyle: {
          backgroundColor: "$primary600",
        },
        pressStyle: {
          backgroundColor: "$primary700",
        },
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
