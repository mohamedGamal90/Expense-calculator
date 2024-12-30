import React from "react";
import { SvgProps } from "react-native-svg"; // Adjust import based on your SVG library
import svgs from "./svg";
import { StyleProp, ViewStyle } from "react-native";
// Define the props interface for the IconComponent
type IconComponent = (props: SvgProps) => React.ReactElement; // Specify the return type

// Define the type for the keys of the icons object
export type IconKeys = keyof typeof svgs; // Get the keys from the icons object

// Function to update icons
export function updateIcons(newIcons: Partial<Record<IconKeys, IconComponent>>) {
  for (const [key, component] of Object.entries(newIcons)) {
    const iconKey = key as IconKeys; // Cast to IconKeys
    if (iconKey in svgs) {
      svgs[iconKey] = component as IconComponent; // Safe to use key
    } else {
      console.warn(`Icon "${iconKey}" does not exist and will not be added.`);
    }
  }
}

type IconComponentProps = SvgProps & {
  name: IconKeys; // Ensure the name prop is a valid key of the icons object
  color?: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

// Create the IconComponent functional component
export const Icon = ({ name, ...props }: IconComponentProps) => {
  const Component = svgs[name];

  // If Component is not found, return a fallback or handle it appropriately
  if (!Component) {
    console.error(`Icon with name "${name}" not found.`);
    return null;
  }

  return <Component {...props} />;
};
