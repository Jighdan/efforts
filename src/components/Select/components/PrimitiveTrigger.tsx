import { Icon, Trigger, Value } from "@radix-ui/react-select";
import cx from "classnames";
import { forwardRef } from "react";

import { IconArrowDown } from "~/assets/icons/IconArrowDown";

import { PropsWithoutControl } from "../interfaces";

type Props = Pick<PropsWithoutControl, "placeholder" | "name" | "value">;

export const PrimitiveTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ placeholder, name, value }, ref) => {
    const className = cx(
      "py-1 flex items-center justify-between border-b border-b-silver bg-transparent focus:outline-none",
      { "text-black": !!value, "text-silver font-light": !value }
    );

    return (
      <Trigger className={className} ref={ref}>
        <Value placeholder={placeholder} aria-label={name} />

        <Icon className="ml-2">
          <IconArrowDown className="stroke-silver size-sm" />
        </Icon>
      </Trigger>
    );
  }
);

PrimitiveTrigger.displayName = "PrimitiveTrigger";
