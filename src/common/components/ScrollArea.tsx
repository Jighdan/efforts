import { Root, Viewport, Scrollbar, Thumb } from "@radix-ui/react-scroll-area";
import { ComponentProps } from "react";
import { WithChildren } from "~/common/interfaces/with-children";

interface Props extends PrimitiveScrollbarProps, WithChildren {}

type PrimitiveScrollbarProps = Pick<
  ComponentProps<typeof Scrollbar>,
  "orientation"
>;

export const ScrollArea = ({ orientation = "vertical", children }: Props) => (
  <Root type="hover" dir="ltr">
    <Viewport>{children}</Viewport>

    <Scrollbar orientation={orientation}>
      <Thumb />
    </Scrollbar>
  </Root>
);
