import { getLocaleDate, getLocaleTime } from "~/common/utilities/date";
import { useStore } from "~/store";
import { ButtonAdd } from "~/common/components/ButtonAdd";
import { ModalEntry } from "./components/ModalEntry";
import { useState } from "react";
import { ScrollArea } from "~/common/components/ScrollArea";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const store = useStore();
  const date = getLocaleDate();

  const entries = store.getTodayEntries();

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

      <main>
        <ScrollArea>
          <ul className="list-disc flex flex-col gap-6">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-start before:content-['●'] before:inline-block before:text-silver gap-2 select-none"
              >
                <div className="flex flex-col grow">
                  <div className="flex justify-between">
                    <span className="text-silver font-light">
                      <>{getLocaleTime(new Date(entry.date))}</>
                    </span>

                    <span className="text-silver font-light line-clamp-1">
                      {entry.effort_title}
                    </span>
                  </div>

                  <p>{entry.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </main>

      <ModalEntry
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        efforts={store.efforts}
      />
    </div>
  );
};
