import { forwardRef, InputHTMLAttributes } from "react";
import { Root as Label } from "@radix-ui/react-label";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <Label htmlFor={props.name} className="flex flex-col gap-1.5">
    <span className="text-white">{props.label}</span>

    <input
      {...props}
      ref={ref}
      aria-label={props?.name}
      className="py-1 bg-transparent text-white border-b border-b-silver focus:outline-none placeholder:text-silver placeholder:lowercase placeholder:font-light"
    />

    {props.error && (
      <span className="text-silver font-light">{props.error}</span>
    )}
  </Label>
));
