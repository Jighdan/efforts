import { Input } from "~/common/components/Input";
import { getLocaleDate } from "~/common/utilities/date";
import { useStore } from "~/store";
import { ButtonAdd } from "~/common/components/ButtonAdd";
import { ModalEntry } from "./components/ModalEntry";
import { useState } from "react";

export const View = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const store = useStore();
  const date = getLocaleDate();

  return (
    <div className="grid grid-rows-[auto_1fr]">
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

      <main></main>

      <ModalEntry
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        efforts={store.efforts}
      />
    </div>
  );
};
