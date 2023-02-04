import { ReactNode, ComponentProps } from "react";
import cx from "classnames";
import * as Primitive from "@radix-ui/react-select";
import { IconArrowDown } from "~/common/assets/icons/IconArrowDown";
import {
  FieldValues,
  useController,
  FieldPath,
  Control,
  RegisterOptions,
} from "react-hook-form";
import { Root as Label } from "@radix-ui/react-label";

interface Props<FormFields extends FieldValues>
  extends PrimitiveRootProps,
    PrimitiveValueProps {
  label: string;
  name: FieldPath<FormFields>;
  children: Item[];
  rules?: RegisterOptions;
  control?: Control<FormFields>;
}

interface Item extends PrimitiveItemProps {
  label: ReactNode;
}

type PrimitiveRootProps = Pick<
  ComponentProps<typeof Primitive.Root>,
  "required" | "disabled"
>;
type PrimitiveValueProps = Pick<
  ComponentProps<typeof Primitive.Value>,
  "placeholder"
>;
type PrimitiveItemProps = Pick<
  ComponentProps<typeof Primitive.Item>,
  "value" | "disabled"
>;

export function Select<FormFields extends FieldValues>({
  label,
  placeholder,
  children,
  control,
  rules,
  required,
  name,
  disabled,
}: Props<FormFields>) {
  const { field, fieldState } = useController({ name, control, rules });

  const triggerClassNames = cx(
    "py-1 flex items-center justify-between border-b border-b-silver bg-transparent focus:outline-none",
    { "text-white": !!field.value, "text-silver font-light": !field.value }
  );

  return (
    <Label htmlFor={field.name} className="flex flex-col gap-1.5">
      <span className="text-white">{label}</span>

      <Primitive.Root
        onValueChange={field.onChange}
        {...field}
        required={required}
        disabled={disabled}
        dir="ltr"
      >
        <Primitive.Trigger className={triggerClassNames}>
          <Primitive.Value placeholder={placeholder} aria-label={field?.name} />

          <Primitive.Icon className="ml-2">
            <IconArrowDown className="size-sm stroke-white" />
          </Primitive.Icon>
        </Primitive.Trigger>

        <Primitive.Content
          position="popper"
          side="bottom"
          align="start"
          className="w-[var(--radix-select-trigger-width)]"
        >
          <Primitive.Viewport className="bg-white">
            {children.map((item) => (
              <Primitive.Item
                key={item.value}
                value={item.value}
                disabled={item.disabled}
                className="p-2 focus:outline-none select-none hover:bg-silver"
              >
                <Primitive.ItemText>{item.label}</Primitive.ItemText>
              </Primitive.Item>
            ))}
          </Primitive.Viewport>
        </Primitive.Content>
      </Primitive.Root>

      {fieldState.error?.message && (
        <span className="text-silver font-light">
          {fieldState.error?.message}
        </span>
      )}
    </Label>
  );
}
