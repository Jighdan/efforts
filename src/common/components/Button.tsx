import { ButtonHTMLAttributes } from "react";
import { WithChildren } from "~/common/interfaces/with-children";

interface Props extends WithChildren, PrimitiveProps {
  label: string;
}

type PrimitiveProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type"
>;

export const Button = ({
  label,
  type = "button",
  onClick,
  children,
}: Props) => (
  <button
    title={label}
    type={type}
    onClick={onClick}
    className="py-2 px-4 bg-white text-black focus:outline-none rounded-md lowercase"
  >
    {children}
  </button>
);
