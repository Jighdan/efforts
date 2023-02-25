import { Content, Item, ItemText, Viewport } from "@radix-ui/react-select";
import { forwardRef } from "react";

import { PropsWithoutControl } from "../interfaces";

type Props = Pick<PropsWithoutControl, "items">;

export const PrimitiveContent = forwardRef<HTMLDivElement, Props>(
  ({ items }, ref) => (
    <Content
      position="popper"
      side="bottom"
      align="start"
      className="w-[var(--radix-select-trigger-width)]"
      ref={ref}
    >
      <Viewport className="bg-white">
        {items.map((item) => (
          <Item
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className="select-none p-2 hover:bg-silver focus:outline-none"
          >
            <ItemText>{item.label}</ItemText>
          </Item>
        ))}
      </Viewport>
    </Content>
  )
);

PrimitiveContent.displayName = "PrimitiveContent";
