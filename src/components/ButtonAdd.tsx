import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

import { IconPlus } from "~/assets/icons/IconPlus";

type Props = PrimitiveProps;

type PrimitiveProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "disabled" | "title"
>;

export const ButtonAdd = ({ title, onClick, disabled }: Props) => {
  const className = cx("focus:outline-none", {
    group: !disabled,
    "cursor-not-allowed": disabled,
  });

  const iconClassName = cx("stroke-silver size-md", {
    "group-hover:stroke-black group-focus:stroke-black": !disabled,
  });

  return (
    <button
      title={title}
      onClick={onClick}
      className={className}
      type="button"
      disabled={disabled}
    >
      <IconPlus className={iconClassName} />
    </button>
  );
};
