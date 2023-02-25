import Link from "next/link";
import { useState } from "react";

import { ButtonAdd } from "~/components/ButtonAdd";
import { EffortDto } from "~/dto/effort";

import { ModalEffort } from "./components/ModalEffort";

interface Props {
  efforts: EffortDto[];
}

export const View = ({ efforts }: Props) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <h2 className="text-2xl">Efforts</h2>
        <ButtonAdd label="Add Effort" onClick={() => setIsFormOpen(true)} />
      </div>

      {efforts.length ? (
        <ul className="grid auto-rows-fr gap-4">
          {efforts.map((effort) => (
            <li key={effort.id} className="contents">
              <Link
                href={`/efforts/${effort.id}`}
                className="rounded-md border-2 border-silver p-4 text-silver transition-colors hover:border-black hover:text-black focus:border-black focus:text-black focus:outline-none"
              >
                {effort.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-silver">No Efforts</p>
      )}

      <ModalEffort isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  );
};
