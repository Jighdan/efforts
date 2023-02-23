import { Dispatch, SetStateAction } from "react";
import { FormEffortEntry } from "~/components/FormEffortEntry";
import { Modal } from "~/components/Modal";
import { EffortDto } from "~/dto/effort";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  efforts: EffortDto[];
}

export const ModalEntry = ({ isOpen, setIsOpen, efforts }: Props) => (
  <Modal
    isOpen={isOpen}
    onStateChange={(state) => setIsOpen(state)}
    title="Add Entry"
    description="Form to add an effort entry"
  >
    <FormEffortEntry efforts={efforts} closeModal={() => setIsOpen(false)} />
  </Modal>
);
