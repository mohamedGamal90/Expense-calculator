import { styled, Input, InputProps, TextArea } from "tamagui";

type Props = InputProps & { value?: string };

const commonStyles = {
  unstyled: true,
  backgroundColor: "$white",
  color: "$gray900",
  paddingVertical: "$base",
  paddingHorizontal: "$s",
  outlineColor: "$white",
  borderWidth: 1,
  borderColor: "$gray50",
};

const InputComponent = styled(Input, commonStyles);

const TextAreaComponent = styled(TextArea, commonStyles);

export const TextInput: React.FC<Props> = ({ value, ...props }: Props) => {
  return <InputComponent value={value} {...props} />;
};

export const TextAreaInput: React.FC<Props> = ({ value, ...props }: Props) => {
  return <TextAreaComponent value={value} {...props} />;
};
