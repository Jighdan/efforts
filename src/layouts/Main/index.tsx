import { ComponentProps } from "react";
import { WithChildren } from "~/interfaces/with-children";
import { Navigation } from "./components/Navigation";
import { Routes } from "~/enums/routes";
import { IconQueueList } from "~/assets/icons/IconQueueList";
import { IconPencil } from "~/assets/icons/IconPencil";
import { IconSettings } from "~/assets/icons/IconSettings";
import { useLayoutRefContext } from "~/contexts/layout-ref";

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
      className="min-h-screen max-h-screen max-sm:px-8 md:py-8 container layout-main first:overflow-hidden"
      ref={ref}
    >
      {children}

      <footer className="w-full pt-4 border-t-2 border-t-silver hover:border-t-black">
        <Navigation items={navigation} />
      </footer>
    </div>
  );
};
