import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

import { IconPlus } from "~/assets/icons/IconPlus";

interface Props extends PrimitiveProps {
  label: string;
}

type PrimitiveProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled"
>;

export const ButtonAdd = ({ label, onClick, disabled }: Props) => {
  const className = cx("focus:outline-none", {
    group: !disabled,
    "cursor-not-allowed": disabled,
  });

  const iconClassName = cx("stroke-silver size-md", {
    "group-hover:stroke-black group-focus:stroke-black": !disabled,
  });

  return (
    <button
      title={label}
      onClick={onClick}
      className={className}
      type="button"
      aria-label={label}
      disabled={disabled}
    >
      <IconPlus className={iconClassName} />
    </button>
  );
};
