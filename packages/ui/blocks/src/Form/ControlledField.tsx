import { useController } from "react-hook-form";
import { FieldGroup } from "./FieldGroup";
import { FieldItem } from "./FormContainer";

type ControlledFieldProps = FieldItem & {
  fieldName: string;
  error?: string;
};

export const ControlledField = ({
  fieldName,
  error,
  ...inputProps
}: ControlledFieldProps) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name: fieldName,
  });

  return (
    <FieldGroup
      {...inputProps}
      {...field}
      error={error ?? errors[fieldName]?.message?.toString()}
    />
  );
};
