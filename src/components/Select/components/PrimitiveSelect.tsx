import { Root } from "@radix-ui/react-select";
import { forwardRef } from "react";

import { PropsWithoutControl } from "../interfaces";
import { PrimitiveContent } from "./PrimitiveContent";
import { PrimitiveTrigger } from "./PrimitiveTrigger";

export const PrimitiveSelect = forwardRef<
  HTMLButtonElement,
  PropsWithoutControl
>(
  (
    { name, value, onValueChange, disabled, required, items, placeholder },
    ref
  ) => (
    <Root
      name={name}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      required={required}
      dir="ltr"
    >
      <PrimitiveTrigger
        ref={ref}
        placeholder={placeholder}
        name={name}
        value={value}
      />

      <PrimitiveContent items={items} />
    </Root>
  )
);

PrimitiveSelect.displayName = "PrimitiveSelect";
