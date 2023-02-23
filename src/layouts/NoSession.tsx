import { PropsWithChildren, ComponentProps } from "react";
import { Button } from "~/components/Button";

interface Props extends PropsWithChildren {
  footerAction: ComponentProps<typeof Button>;
}

export const LayoutNoSession = ({ footerAction, children }: Props) => (
  <div className="min-h-screen max-h-screen max-sm:px-8 md:py-8 container layout-main first:overflow-hidden">
    {children}

    <footer className="w-full pt-4 child:w-full">
      <Button {...footerAction} />
    </footer>
  </div>
);
