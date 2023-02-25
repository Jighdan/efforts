import { ComponentProps } from "react";

import { Label } from "~/components/Label";
import { WithChildren } from "~/interfaces/with-children";

interface Props extends WithChildren, LabelProps {
  error?: string;
  name?: string;
}

type LabelProps = Pick<ComponentProps<typeof Label>, "label">;

export const InputControl = ({ name, label, error, children }: Props) => (
  <Label htmlFor={name} label={label}>
    {children}
    {error && <span className="font-light text-silver">{error}</span>}
  </Label>
);
