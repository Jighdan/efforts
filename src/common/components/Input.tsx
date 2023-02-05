import { forwardRef, InputHTMLAttributes } from "react";
import { InputControl } from "~/common/components/InputControl";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <InputControl label={props.label} name={props.name} error={props.error}>
    <input
      {...props}
      ref={ref}
      aria-label={props?.name}
      className="py-1 bg-transparent text-white border-b border-b-silver focus:outline-none placeholder:text-silver placeholder:lowercase placeholder:font-light"
    />
  </InputControl>
));
