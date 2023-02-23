import cx from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  label: string;
  href: LinkProps["href"];
  icon: ReactNode;
}

export const NavigationItem = ({ label, href, icon }: Props) => {
  const router = useRouter();
  const isActiveRoute = router.asPath === href;

  const className = cx(
    "child:size-md focus:outline-none child:stroke-silver child:hover:stroke-black child:focus:stroke-black",
    {
      "child:stroke-black": isActiveRoute,
    }
  );

  return (
    <li className="contents">
      <Link href={href} className={className} title={label}>
        {icon}
      </Link>
    </li>
  );
};
