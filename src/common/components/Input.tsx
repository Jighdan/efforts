import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input {...props} ref={ref} aria-label={props?.name} />
));
