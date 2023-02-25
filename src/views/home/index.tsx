import { useState } from "react";

import { ButtonAdd } from "~/components/ButtonAdd";
import { useTodayEntriesContext } from "~/contexts/entries-today";
import { useEfforts } from "~/hooks/useEfforts";
import { getLocaleDate, getLocaleTime } from "~/utilities/date";

import { ModalEntry } from "./components/ModalEntry";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { efforts } = useEfforts();
  const { entries } = useTodayEntriesContext();
  const date = getLocaleDate();

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6">
      <header className="flex items-start justify-between">
        <h1 className="flex flex-col">
          <span className="text-xl">
            {date.month} {date.day}
          </span>
          <span className="text-4xl">{date.weekday}</span>
        </h1>

        <ButtonAdd
          label="Add an entry"
          onClick={() => {
            setIsFormOpen(true);
          }}
        />
      </header>

      <ul className="flex list-disc flex-col gap-6 overflow-y-auto">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex select-none items-start gap-2 before:inline-block before:text-silver before:content-['●'] last:pb-6"
          >
            <div className="flex grow flex-col">
              <div className="flex justify-between">
                <span className="font-light text-silver">
                  <>{getLocaleTime(new Date(entry.date))}</>
                </span>

                <div
                  role="figure"
                  className="h-3 w-3 rounded-full border border-black"
                  style={{ backgroundColor: entry.effort.color }}
                />
              </div>

              <p>{entry.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <ModalEntry
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        efforts={efforts}
      />
    </div>
  );
};
