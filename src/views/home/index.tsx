import { useState } from "react";

import { ButtonAdd } from "~/components/ButtonAdd";
import { Tooltip } from "~/components/Tooltip";
import { useTodayEntriesContext } from "~/contexts/entries-today";
import { useEfforts } from "~/hooks/useEfforts";

import { DateInformation } from "./components/DateInformation";
import { Entries } from "./components/Entries";
import { ModalEntry } from "./components/ModalEntry";
import { NoEntriesMessage } from "./components/NoEntriesMessage";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { efforts } = useEfforts();
  const { entries } = useTodayEntriesContext();

  const hasCreatedEfforts = !!efforts.length;

  const onButtonAddClick = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] gap-6">
        <header className="flex items-start justify-between">
          <DateInformation />

          <Tooltip
            showTooltip={!hasCreatedEfforts}
            label="Create an effort first"
          >
            <ButtonAdd
              onClick={onButtonAddClick}
              disabled={!hasCreatedEfforts}
            />
          </Tooltip>
        </header>

        {entries.length ? <Entries entries={entries} /> : <NoEntriesMessage />}
      </div>

      <ModalEntry
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        efforts={efforts}
      />
    </>
  );
};
