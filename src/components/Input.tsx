import { forwardRef, InputHTMLAttributes } from "react";

import { InputControl } from "~/components/InputControl";

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
      className="border-b border-b-black bg-transparent py-1 text-black placeholder:font-light placeholder:lowercase placeholder:text-black focus:outline-none"
    />
  </InputControl>
));

Input.displayName = "Input";
