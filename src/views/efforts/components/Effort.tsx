import Link from "next/link";

import { EffortDto } from "~/dto/effort";
import { Routes } from "~/enums/routes";
import { generatePath } from "~/utilities/routes";

interface Props {
  effort: EffortDto;
}

export const Effort = ({ effort }: Props) => {
  const effortId = `${effort.id}`;
  const linkHref = generatePath(Routes.EFFORT, { effortId });

  return (
    <li className="contents">
      <Link
        href={linkHref}
        className="rounded-md border-2 border-silver p-4 text-silver transition-colors hover:border-black hover:text-black focus:border-black focus:text-black focus:outline-none"
      >
        {effort.title}
      </Link>
    </li>
  );
};
