import { Root } from "@radix-ui/react-label";
import { ComponentProps } from "react";

import { WithChildren } from "~/interfaces/with-children";

interface Props extends WithChildren, PrimitiveProps {
  label: string;
}

type PrimitiveProps = Pick<ComponentProps<typeof Root>, "htmlFor">;

export const Label = ({ label, htmlFor, children }: Props) => (
  <Root htmlFor={htmlFor} className="flex flex-col gap-1.5">
    <span className="text-black">{label}</span>
    {children}
  </Root>
);
