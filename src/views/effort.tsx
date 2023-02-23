import { IconArrowLeft } from "~/assets/icons/IconArrowLeft";
import Link from "next/link";
import { Routes } from "~/enums/routes";
import { useEffortContext } from "~/contexts/effort";

export const View = () => {
  const { effort } = useEffortContext();

  return (
    <div className="max-h-full overflow-y-hidden flex flex-col gap-6">
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
                <h4 className="text-silver text-light">
                  {entry?.id} - {entry?.date}
                </h4>
                <p>{entry.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-center text-silver">
          No Entries for this effort
        </p>
      )}
    </div>
  );
};
