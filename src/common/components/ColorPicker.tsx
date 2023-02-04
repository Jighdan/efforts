import * as Primitive from "@radix-ui/react-radio-group";
import { ComponentProps, forwardRef, ReactNode, RefObject } from "react";
import {
  FieldValues,
  useController,
  FieldPath,
  Control,
  RegisterOptions,
  UseControllerProps,
} from "react-hook-form";
import { Root as Label } from "@radix-ui/react-label";

interface Props<FormFields extends FieldValues>
  extends UseControllerProps<FormFields> {
  label: string;
  items: Item[];
  disabled?: boolean;
  required?: boolean;
}

interface PropsWithoutControl extends PrimitiveRootProps {
  label: string;
  items: Item[];
  error?: string;
}

interface Item extends PrimitiveItemProps {
  label: ReactNode;
}

type PrimitiveRootProps = Pick<
  ComponentProps<typeof Primitive.Root>,
  "name" | "value" | "onValueChange" | "disabled" | "required"
>;
type PrimitiveItemProps = Pick<
  ComponentProps<typeof Primitive.Item>,
  "value" | "disabled"
>;

export function ColorPicker<FormFields extends FieldValues>({
  label,
  name,
  control,
  rules,
  items,
  disabled = false,
  required = false,
}: Props<FormFields>) {
  const { field, fieldState } = useController({ name, control, rules });

  return (
    <ColorPickerBase
      label={label}
      name={field.name}
      value={field.value}
      onValueChange={(value) => field.onChange(value)}
      disabled={disabled}
      required={required}
      ref={field.ref}
      items={items}
      error={fieldState.error?.message}
    />
  );
}

export const ColorPickerBase = forwardRef<HTMLDivElement, PropsWithoutControl>(
  (
    {
      label,
      name,
      value,
      onValueChange,
      items,
      required = false,
      disabled = false,
      error,
    },
    ref
  ) => (
    <Label htmlFor={name} className="flex flex-col gap-1.5">
      <span className="text-white">{label}</span>

      <Primitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
        orientation="horizontal"
        dir="ltr"
        loop
        className="py-1 grid grid-cols-5 gap-4"
        ref={ref}
        name={name}
      >
        {items.map((item) => (
          <Primitive.Item
            key={`color-picker-${item.value}`}
            value={item.value}
            disabled={item.disabled}
            className="size-lg rounded-full"
            style={{ backgroundColor: item.value }}
          >
            <Primitive.Indicator className="block mx-auto size-lg border-4 border-silver rounded-full " />
          </Primitive.Item>
        ))}
      </Primitive.Root>

      {error && <span className="text-silver font-light">{error}</span>}
    </Label>
  )
);
