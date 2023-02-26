import cx from "classnames";

import { IconCheckmark } from "~/assets/icons/IconCheckmark";

interface Props {
  isChecked: boolean;
  label: string;
}

export const PasswordChecklistItem = ({ label, isChecked }: Props) => {
  const iconClassName = cx("w-4 h-4", {
    "stroke-black": isChecked,
    "stroke-silver": !isChecked,
  });

  const labelClassName = cx({
    "text-silver": !isChecked,
    "text-black": isChecked,
  });

  return (
    <li className="flex items-center gap-2">
      <IconCheckmark className={iconClassName} />
      <span className={labelClassName}>{label}</span>
    </li>
  );
};
