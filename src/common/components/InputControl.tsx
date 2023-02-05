import { ComponentProps } from "react";
import { Label } from "~/common/components/Label";
import { WithChildren } from "~/common/interfaces/with-children";

interface Props extends WithChildren, LabelProps {
  name?: string;
  error?: string;
}

type LabelProps = Pick<ComponentProps<typeof Label>, "label">;

export const InputControl = ({ name, label, error, children }: Props) => (
  <Label htmlFor={name} label={label}>
    {children}
    {error && <span className="text-silver font-light">{error}</span>}
  </Label>
);
