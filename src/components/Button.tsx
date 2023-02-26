import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

import { WithChildren } from "~/interfaces/with-children";

interface Props extends WithChildren, PrimitiveProps {
  label: string;
  variant?: "default" | "outlined";
}

type PrimitiveProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "type" | "disabled"
>;

export const Button = ({
  label,
  variant = "default",
  type = "button",
  onClick,
  disabled = false,
  children,
}: Props) => {
  const isDefault = variant === "default";
  const isOutlined = variant === "outlined";

  const className = cx(
    "py-2 px-4 focus:outline-none rounded-md lowercase font-bold",
    {
      "bg-black text-white": isDefault && !disabled,
      "bg-silver text-black": isDefault && disabled,
      "border-2": isOutlined,
      "border-black text-black": isOutlined && !disabled,
      "border-silver text-silver": isOutlined && disabled,
      "cursor-not-allowed": disabled,
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
