import { ReactNode, ComponentProps } from "react";
import * as Primitive from "@radix-ui/react-select";
import { IconArrowDown } from "~/common/assets/icons/IconArrowDown";
import { FieldValues, useController, FieldPath, Control ,RegisterOptions } from "react-hook-form";

interface Props<FormFields extends FieldValues> extends PrimitiveRootProps, PrimitiveValueProps {
	name: FieldPath<FormFields>;
	children: Item[];
	rules?: RegisterOptions;
	control?: Control<FormFields>;
};

interface Item extends PrimitiveItemProps {
	label: ReactNode;
};

type PrimitiveRootProps = Pick<ComponentProps<typeof Primitive.Root>, 'required' | 'disabled'>;
type PrimitiveValueProps = Pick<ComponentProps<typeof Primitive.Value>, 'placeholder'>;
type PrimitiveItemProps = Pick<ComponentProps<typeof Primitive.Item>, 'value' | 'disabled'>;

export function Select<FormFields extends FieldValues>({
  placeholder,
  children,
  control,
  rules,
  required,
  name,
  disabled,
}: Props<FormFields>) {
  const { field } = useController({ name, control, rules });

  return (
    <Primitive.Root
      onValueChange={field.onChange}
      {...field}
      required={required}
      disabled={disabled}
      dir="ltr"
    >
      <Primitive.Trigger className='flex h-10 items-center justify-between rounded-md border border-black bg-transparent py-2 px-3 text-sm placeholder:text-olive focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
        <Primitive.Value placeholder={placeholder} aria-label={field?.name} />

        <Primitive.Icon className="ml-2">
          <IconArrowDown />
        </Primitive.Icon>
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Content position="popper" align="center">
          <Primitive.Viewport className='bg-white rounded-lg shadow-sm'>
            {children.map((item) => (
              <Primitive.Item
                value={item.value}
                disabled={item.disabled}
                className="p-2 focus:outline-none select-none"
              >
                <Primitive.ItemText>{item.label}</Primitive.ItemText>
              </Primitive.Item>
            ))}
          </Primitive.Viewport>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
