import { useRouter } from "next/router";

import { Button } from "~/components/Button";
import { DialogAlert } from "~/components/DialogAlert";
import { EmptyListMessage } from "~/components/EmptyListMessage";
import { HeaderWithLinkBack } from "~/components/HeaderWithLinkBack";
import { Tooltip } from "~/components/Tooltip";
import { useEffortContext } from "~/contexts/effort";
import { database } from "~/database";
import { Routes } from "~/enums/routes";
import { useToggler } from "~/hooks/useToggler";

import { EffortEntries } from "./components/EffortEntries";

export const View = () => {
  const router = useRouter();
  const { effort } = useEffortContext();
  const [isDeleteDialogOpen, toggleIsDeleteDialogOpen] = useToggler();

  const onDelete = async () => {
    if (effort) {
      await database.entries.deleteAll(effort?.id);
      await database.efforts.delete(effort.id);
      router.push(Routes.ALL_EFFORTS);
    }
  };

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] gap-6 overflow-y-hidden">
        <div className="flex flex-col gap-4">
          <HeaderWithLinkBack href={Routes.ALL_EFFORTS}>
            {effort?.title}
          </HeaderWithLinkBack>

          <aside className="flex items-center gap-4">
            <Tooltip label="Work in Progress">
              <Button variant="outlined" disabled>
                Edit
              </Button>
            </Tooltip>

            <Button variant="outlined" onClick={toggleIsDeleteDialogOpen}>
              Delete
            </Button>
          </aside>
        </div>

        {effort?.entries.length ? (
          <EffortEntries effort={effort} />
        ) : (
          <EmptyListMessage>
            There are no entries for this effort.
          </EmptyListMessage>
        )}
      </div>

      <DialogAlert
        title="delete effort"
        description="confirmation to delete an effort"
        isOpen={isDeleteDialogOpen}
        onOpenChange={toggleIsDeleteDialogOpen}
        cancelText="Cancel"
        actionText="Delete"
        action={onDelete}
      >
        Are you sure you want to delete <b>{effort?.title}</b>?
      </DialogAlert>
    </>
  );
};
