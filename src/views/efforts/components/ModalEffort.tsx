import { Dispatch, SetStateAction } from "react";

import { FormEffort } from "~/components/FormEffort";
import { Modal } from "~/components/Modal";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalEffort = ({ isOpen, setIsOpen }: Props) => (
  <Modal
    isOpen={isOpen}
    onStateChange={(state) => setIsOpen(state)}
    title="Add Effort"
    description="Form to add an effort"
  >
    <FormEffort closeModal={() => setIsOpen(false)} />
  </Modal>
);
