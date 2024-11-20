import { forwardRef } from "react";
import { ViewStyle, InputProps, TextAreaProps } from "tamagui";
import { FieldType } from "./types";
import { TextInput, TextAreaInput } from "@aurora/components";

export type FieldProps = {
	type?: FieldType;
	style?: ViewStyle;
	onChange?: (value: string) => void;
} & (InputProps | TextAreaProps);

const FIELD_COMPONENTS = {
	textInput: TextInput,
	textArea: TextAreaInput,
};

export const Field = forwardRef<
	React.Ref<InputProps | TextAreaProps>,
	FieldProps
>(({ type = "textInput", onChange, ...props }, _ref) => {
	const InputComponent = FIELD_COMPONENTS[type];

	return (
		<InputComponent
			flex={1}
			onChangeText={(text) => onChange?.(text)}
			{...props}
		/>
	);
});
