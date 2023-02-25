import { ComponentProps, PropsWithChildren } from "react";

import { Button } from "~/components/Button";

interface Props extends PropsWithChildren {
  footerAction: ComponentProps<typeof Button>;
}

export const LayoutNoSession = ({ footerAction, children }: Props) => (
  <div className="container layout-main max-h-screen min-h-screen first:overflow-hidden max-sm:px-8 md:py-8">
    {children}

    <footer className="w-full pt-4 child:w-full">
      <Button {...footerAction} />
    </footer>
  </div>
);
