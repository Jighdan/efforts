import { forwardRef } from "react";
import { PropsWithoutControl } from "../interfaces";
import { Root, Item, Indicator } from "@radix-ui/react-radio-group";

export const PrimitiveColorPicker = forwardRef<
  HTMLDivElement,
  PropsWithoutControl
>(({ value, onValueChange, disabled, required, name, items }, ref) => (
  <Root
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
      <Item
        key={`color-picker-${item.value}`}
        value={item.value}
        disabled={item.disabled}
        className="size-lg rounded-full"
        style={{ backgroundColor: item.value }}
      >
        <Indicator className="block mx-auto size-lg border-4 border-silver rounded-full " />
      </Item>
    ))}
  </Root>
));
