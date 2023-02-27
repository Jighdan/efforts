import { useState } from "react";

import { ButtonAdd } from "~/components/ButtonAdd";
import { EmptyListMessage } from "~/components/EmptyListMessage";
import { EffortDto } from "~/dto/effort";

import { EffortList } from "./components/EffortList";
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
        <ButtonAdd onClick={() => setIsFormOpen(true)} />
      </div>

      {efforts.length ? (
        <EffortList efforts={efforts} />
      ) : (
        <EmptyListMessage>There are no efforts.</EmptyListMessage>
      )}

      <ModalEffort isOpen={isFormOpen} setIsOpen={setIsFormOpen} />
    </div>
  );
};
