import React, { forwardRef, useRef, useState, useEffect } from "react";
import { View, ViewStyle, InputProps, TextAreaProps, XStack } from "tamagui";

import { Field } from "./Field";
import { FieldType } from "./types";
import { Icon, IconKeys } from "@aurora/icons";
import { StyledText } from "@aurora/components";
import { Pressable } from "react-native";

export type FieldGroupProps = {
  label?: string;
  error?: string;
  type?: FieldType;
  containerStyle?: ViewStyle;
  iconLeft?: IconKeys;
  iconRight?: IconKeys;
  secureTextEntry?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  renderBefore?: () => React.ReactNode;
  renderAfter?: () => React.ReactNode;
} & (InputProps | TextAreaProps);

type IconProps = {
  name?: IconKeys;
  disabled?: boolean;
  onPress?: () => void;
};

const IconField = ({ name, disabled, onPress }: IconProps) => {
  if (!name) return null;
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Icon name={name} />
    </Pressable>
  );
};

export const FieldGroup = forwardRef<any, FieldGroupProps>(
  (
    {
      label,
      error,
      type,
      iconLeft,
      iconRight,
      containerStyle,
      secureTextEntry,
      value,
      placeholder,
      onChange,
      renderAfter,
      renderBefore,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(!secureTextEntry);
    const hidePasswordTimer = useRef<NodeJS.Timeout | null>(null);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
      if (!showPassword) {
        hidePasswordTimer.current = setTimeout(() => {
          setShowPassword(false);
        }, 3000);
      } else if (hidePasswordTimer.current) {
        clearTimeout(hidePasswordTimer.current);
      }
    };

    useEffect(() => {
      return () => {
        if (hidePasswordTimer.current) {
          clearTimeout(hidePasswordTimer.current);
        }
      };
    }, []);

    return (
      <View {...containerStyle} marginBottom="$l">
        {renderBefore?.()}
        {label && (
          <StyledText variant="Bodym" color={"$secondary500"} marginBottom="$s">
            {label}
          </StyledText>
        )}
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          borderColor="$secondary800"
          borderRadius="$s"
          overflow="hidden"
          paddingHorizontal="$s"
          borderWidth={1}
          backgroundColor="white"
          paddingVertical="$s"
          marginBottom="$s">
          {iconLeft && <IconField name={iconLeft} />}
          <Field
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            secureTextEntry={secureTextEntry && !showPassword}
            ref={ref}
          />
          <XStack gap="$s" alignItems="center" justifyContent="center">
            {secureTextEntry && (
              <IconField name={showPassword ? "eye" : "eye-slash"} onPress={handleShowPassword} />
            )}
          </XStack>
        </View>
        <StyledText color="$error500">{error}</StyledText>
        {renderAfter?.()}
      </View>
    );
  },
);

FieldGroup.displayName = "FieldGroup";
