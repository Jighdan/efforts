import { ComponentProps, useRef } from "react";
import { WithChildren } from "~/common/interfaces/with-children";
import { Navigation } from "./components/Navigation";
import { Routes } from "~/common/enums/routes";
import { IconQueueList } from "~/common/assets/icons/IconQueueList";
import { IconPencil } from "~/common/assets/icons/IconPencil";
import { IconCalendar } from "~/common/assets/icons/IconCalendar";
import { useLayoutRefContext } from "~/common/contexts/layout-ref";

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
    href: Routes.CALENDAR,
    icon: <IconCalendar />,
  },
];

export const Layout = ({ children }: Props) => {
  const { ref } = useLayoutRefContext();

  return (
    <div
      className="min-h-screen max-sm:px-8 md:py-8 container layout-main"
      ref={ref}
    >
      {children}

      <footer className="w-full pt-4 border-t-2 border-t-silver hover:border-t-black">
        <Navigation items={navigation} />
      </footer>
    </div>
  );
};
