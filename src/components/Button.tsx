import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

import { WithChildren } from "~/interfaces/with-children";

interface Props extends WithChildren, PrimitiveProps {
  label: string;
}

type PrimitiveProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

export const Button = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  children,
}: Props) => {
  const className = cx(
    "py-2 px-4 focus:outline-none rounded-md lowercase font-bold",
    {
      "bg-black text-white": !disabled,
      "bg-silver text-black cursor-not-allowed": disabled,
    }
  );

  return (
    <button
      title={label}
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
