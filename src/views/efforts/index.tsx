import { useStore } from "~/store";
import Link from "next/link";
import { ButtonAdd } from "~/common/components/ButtonAdd";
import { ModalEffort } from "./components/ModalEffort";
import { useState } from "react";

export const View = () => {
  const { efforts } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-2xl">Efforts</h2>
        <ButtonAdd label="Add Effort" onClick={() => setIsFormOpen(true)} />
      </div>

      <ul className="grid auto-rows-fr gap-4">
        {efforts.map((effort) => (
          <li key={effort.id} className="contents">
            <Link
              href={`/efforts/${effort.id}`}
              className="p-4 border-2 border-silver text-silver hover:border-black focus:border-black hover:text-black focus:text-black focus:outline-none rounded-md transition-colors"
            >
              {effort.title}
            </Link>
          </li>
        ))}
      </ul>

      <ModalEffort isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  );
};
