import { getLocaleDate, getLocaleTime } from "~/common/utilities/date";
import { ButtonAdd } from "~/common/components/ButtonAdd";
import { ModalEntry } from "./components/ModalEntry";
import { useState } from "react";
import { useTodayEntriesContext } from "~/common/contexts/entries-today";
import { useEffortsContext } from "~/common/contexts/efforts";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { efforts } = useEffortsContext();
  const date = getLocaleDate();

  const { entries } = useTodayEntriesContext();

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

      <ul className="list-disc flex flex-col gap-6 overflow-y-auto">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-start before:content-['●'] before:inline-block before:text-silver gap-2 select-none last:pb-6"
          >
            <div className="flex flex-col grow">
              <div className="flex justify-between">
                <span className="text-silver font-light">
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
