import {
  GetProps,
  View,
  Text,
  createStyledContext,
  styled,
  withStaticProperties,
  TamaguiElement,
  getTokens,
} from "tamagui";
import { ActivityIndicator } from "react-native";
import { forwardRef, LegacyRef } from "react";

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

      outlined: {
        backgroundColor: "$transparent",
        borderColor: "$gray9",
        borderWidth: 1,
        hoverStyle: {
          backgroundColor: "$transparent",
        },
        disabledStyle: {
          backgroundColor: "$transparent",
        },
        pressStyle: {
          backgroundColor: "$transparent",
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
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export const StyledButton = forwardRef<typeof View, StyledButtonProps>(
  ({ children, icon, isLoading, ...props }, ref) => {
    const { color } = getTokens();

    return (
      <Button
        cursor="pointer"
        gap="$xs"
        {...props}
        ref={ref as LegacyRef<TamaguiElement> | undefined}
        disabled={props.disabled || isLoading}>
        {icon}
        {isLoading ? (
          <ActivityIndicator color={color.$primary800.val} />
        ) : (
          <Button.Text>{children}</Button.Text>
        )}
      </Button>
    );
  },
);

StyledButton.displayName = "StyledButton";
