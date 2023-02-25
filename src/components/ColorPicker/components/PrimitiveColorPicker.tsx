import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { forwardRef } from "react";

import { PropsWithoutControl } from "../interfaces";

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
    className="grid grid-cols-5 gap-4 py-1"
    ref={ref}
    name={name}
  >
    {items.map((item) => (
      <Item
        key={`color-picker-${item.value}`}
        value={item.value}
        disabled={item.disabled}
        className="group rounded-full size-lg focus:outline-none"
        style={{ backgroundColor: item.value }}
      >
        <Indicator className="mx-auto block rounded-full border-4 border-silver size-lg group-focus:mx-auto group-focus:block group-focus:rounded-full group-focus:border-4 group-focus:border-silver group-focus:size-lg" />
      </Item>
    ))}
  </Root>
));

PrimitiveColorPicker.displayName = "PrimitiveColorPicker";
