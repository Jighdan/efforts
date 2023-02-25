import { ComponentProps } from "react";

import { NavigationItem } from "./NavigationItem";

interface Props {
  items: ComponentProps<typeof NavigationItem>[];
}

export const Navigation = ({ items }: Props) => {
  return (
    <ul className="flex justify-evenly">
      {items.map((item) => (
        <NavigationItem key={item.label} {...item} />
      ))}
    </ul>
  );
};
