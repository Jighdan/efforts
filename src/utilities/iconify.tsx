import { Root } from "@radix-ui/react-accessible-icon";
import { cloneElement, HTMLAttributes } from "react";

type Props = Pick<HTMLAttributes<HTMLOrSVGElement>, "className" | "onClick">;

export const Icon = (label: string, svgElement: JSX.Element) => {
  /* eslint-disable-next-line react/display-name */
  return ({ className = "", onClick }: Props) => {
    const element = cloneElement(svgElement, { className, onClick });

    return <Root label={label}>{element}</Root>;
  };
};
