import { Provider } from "@radix-ui/react-tooltip";
import { PropsWithChildren } from "react";

export const TooltipProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>;
};
