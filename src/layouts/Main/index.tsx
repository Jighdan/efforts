import { ComponentProps } from "react";

import { IconPencil } from "~/assets/icons/IconPencil";
import { IconQueueList } from "~/assets/icons/IconQueueList";
import { IconSettings } from "~/assets/icons/IconSettings";
import { useLayoutRefContext } from "~/contexts/layout-ref";
import { Routes } from "~/enums/routes";
import { WithChildren } from "~/interfaces/with-children";

import { Navigation } from "./components/Navigation";

type Props = WithChildren;

const navigation: ComponentProps<typeof Navigation>["items"] = [
  {
    label: "Efforts",
    href: Routes.ALL_EFFORTS,
    icon: <IconQueueList />,
  },
  {
    label: "Home",
    href: Routes.HOME,
    icon: <IconPencil />,
  },
  {
    label: "Calendar",
    href: Routes.SETTINGS,
    icon: <IconSettings />,
  },
];

export const Layout = ({ children }: Props) => {
  const { ref } = useLayoutRefContext();

  return (
    <div
      className="container layout-main max-h-screen min-h-screen first:overflow-hidden max-sm:px-8 md:py-8"
      ref={ref}
    >
      {children}

      <footer className="w-full border-t-2 border-t-silver pt-4 hover:border-t-black">
        <Navigation items={navigation} />
      </footer>
    </div>
  );
};
