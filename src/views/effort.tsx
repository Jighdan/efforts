import Link from "next/link";

import { IconArrowLeft } from "~/assets/icons/IconArrowLeft";
import { useEffortContext } from "~/contexts/effort";
import { Routes } from "~/enums/routes";

export const View = () => {
  const { effort } = useEffortContext();

  return (
    <div className="flex max-h-full flex-col gap-6 overflow-y-hidden">
      <header className="flex flex-col gap-2">
        <Link href={Routes.ALL_EFFORTS} replace title="All efforts">
          <IconArrowLeft className="size-sm" />
        </Link>

        <h2 className="text-2xl">{effort?.title}</h2>
      </header>

      {effort?.entries.length ? (
        <ul className="flex flex-col gap-4 overflow-y-auto">
          {effort?.entries.map((entry) => (
            <li key={entry.id}>
              <div>
                <h4 className="text-light text-silver">
                  {entry?.id} - {entry?.date}
                </h4>
                <p>{entry.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-silver">
          No Entries for this effort
        </p>
      )}
    </div>
  );
};
