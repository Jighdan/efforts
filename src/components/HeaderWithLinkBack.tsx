import Link from "next/link";
import { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

import { IconArrowLeft } from "~/assets/icons/IconArrowLeft";

interface Props extends PropsWithChildren {
  href: LinkProps["href"];
}

export const HeaderWithLinkBack = ({ href, children }: Props) => (
  <header className="flex flex-col gap-2">
    <Link href={href} replace title="All efforts">
      <IconArrowLeft className="size-sm" />
    </Link>

    <h2 className="text-2xl">{children}</h2>
  </header>
);
