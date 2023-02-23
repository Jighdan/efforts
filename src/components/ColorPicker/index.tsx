import { Props } from "./interfaces";
import { FieldValues, useController } from "react-hook-form";
import { PrimitiveColorPicker } from "./components/PrimitiveColorPicker";
import { InputControl } from "~/components/InputControl";

export function ColorPicker<FormFields extends FieldValues>({
  label,
  name,
  control,
  rules,
  children,
  disabled = false,
  required = false,
}: Props<FormFields>) {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <InputControl label={label} name={name} error={fieldState.error?.message}>
      <PrimitiveColorPicker
        name={name}
        value={field.value}
        onValueChange={(value) => field.onChange(value)}
        disabled={disabled}
        required={required}
        items={children}
        ref={field.ref}
      />
    </InputControl>
  );
}
