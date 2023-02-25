import { FieldValues, useController } from "react-hook-form";

import { InputControl } from "~/components/InputControl";

import { PrimitiveSelect } from "./components/PrimitiveSelect";
import { Props } from "./interfaces";

export function Select<FormFields extends FieldValues>({
  label,
  name,
  control,
  rules,
  children,
  placeholder,
  required = false,
  disabled = false,
}: Props<FormFields>) {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <InputControl label={label} name={name} error={fieldState.error?.message}>
      <PrimitiveSelect
        name={name}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
        items={children}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
    </InputControl>
  );
}
