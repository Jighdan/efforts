import { PropsWithChildren } from "react";

export const EmptyListMessage = ({ children }: PropsWithChildren) => (
  <h4 className="place-self-center text-center text-lg text-silver">
    {children}
  </h4>
);
