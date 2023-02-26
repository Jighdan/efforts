import { useState } from "react";

import { ButtonAdd } from "~/components/ButtonAdd";
import { useTodayEntriesContext } from "~/contexts/entries-today";
import { useEfforts } from "~/hooks/useEfforts";

import { DateInformation } from "./components/DateInformation";
import { EffortEntry } from "./components/EffortEntry";
import { ModalEntry } from "./components/ModalEntry";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { efforts } = useEfforts();
  const { entries } = useTodayEntriesContext();

  const onButtonAddClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6">
      <header className="flex items-start justify-between">
        <DateInformation />

        <ButtonAdd label="Add an entry" onClick={onButtonAddClick} />
      </header>

      <ul className="flex list-disc flex-col gap-6 overflow-y-auto">
        {entries.map((entry) => (
          <EffortEntry key={entry.id} entry={entry} />
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
