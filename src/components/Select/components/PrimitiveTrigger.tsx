import { forwardRef } from "react";
import cx from "classnames";
import { Trigger, Value, Icon } from "@radix-ui/react-select";
import { IconArrowDown } from "~/assets/icons/IconArrowDown";
import { PropsWithoutControl } from "../interfaces";

type Props = Pick<PropsWithoutControl, "placeholder" | "name" | "value">;

export const PrimitiveTrigger = forwardRef<HTMLButtonElement, Props>(
  ({ placeholder, name, value }, ref) => {
    const className = cx(
      "py-1 flex items-center justify-between border-b border-b-silver bg-transparent focus:outline-none",
      { "text-white": !!value, "text-silver font-light": !value }
    );

    return (
      <Trigger className={className} ref={ref}>
        <Value placeholder={placeholder} aria-label={name} />

        <Icon className="ml-2">
          <IconArrowDown className="size-sm stroke-white" />
        </Icon>
      </Trigger>
    );
  }
);
