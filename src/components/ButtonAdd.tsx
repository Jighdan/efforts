import { HTMLAttributes } from "react";
import { IconPlus } from "~/assets/icons/IconPlus";

interface Props extends PrimitiveProps {
  label: string;
}

type PrimitiveProps = Pick<HTMLAttributes<HTMLButtonElement>, "onClick">;

export const ButtonAdd = ({ label, onClick }: Props) => (
  <button
    title={label}
    onClick={onClick}
    className="group focus:outline-none"
    type="button"
    aria-label={label}
  >
    <IconPlus className="size-md stroke-silver group-hover:stroke-black group-focus:stroke-black" />
  </button>
);
