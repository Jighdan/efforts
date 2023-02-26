import { Arrow, Content, Portal, Root, Trigger } from "@radix-ui/react-tooltip";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  label: string;
  showTooltip?: boolean;
}

export const Tooltip = ({ label, showTooltip = true, children }: Props) => {
  if (showTooltip) {
    return (
      <Root>
        <Trigger>{children}</Trigger>

        <Portal>
          <Content className="rounded-md bg-black py-1 px-2">
            <Arrow />

            <span className="select-none text-white">{label}</span>
          </Content>
        </Portal>
      </Root>
    );
  }

  return <>{children}</>;
};
