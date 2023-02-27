import Link from "next/link";

import { EffortEntryWithMetaDto } from "~/dto/effort-entry";
import { Routes } from "~/enums/routes";
import { getLocaleTime } from "~/utilities/date";
import { generatePath } from "~/utilities/routes";

interface Props {
  entry: Omit<EffortEntryWithMetaDto, "created_at">;
}

export const EffortEntry = ({ entry }: Props) => {
  const time = getLocaleTime(new Date(entry.date));
  const routePath = generatePath(Routes.EFFORT_ENTRY, {
    entryId: `${entry.id}`,
  });

  return (
    <Link
      key={entry.id}
      href={routePath}
      className="group flex select-none items-start gap-2 before:inline-block before:text-silver before:content-['●'] last:pb-6 hover:before:text-black"
      role="listitem"
    >
      <div className="flex grow flex-col">
        <div className="flex justify-between">
          <span className="font-light text-silver group-hover:text-black">
            {time}
          </span>

          <div
            role="figure"
            className="h-3 w-3 rounded-full border border-black transition-[height,width] group-hover:h-5 group-hover:w-5"
            style={{ backgroundColor: entry.effort.color }}
          />
        </div>

        <p>{entry.description}</p>
      </div>
    </Link>
  );
};
