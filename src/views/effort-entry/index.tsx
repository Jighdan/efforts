import { useRouter } from "next/router";

import { Button } from "~/components/Button";
import { DialogAlert } from "~/components/DialogAlert";
import { HeaderWithLinkBack } from "~/components/HeaderWithLinkBack";
import { Tooltip } from "~/components/Tooltip";
import { database } from "~/database";
import { EffortEntryWithMetaDto } from "~/dto/effort-entry";
import { Routes } from "~/enums/routes";
import { useToggler } from "~/hooks/useToggler";
import { getLocaleDate, getLocaleTime } from "~/utilities/date";

interface Props {
  entry: EffortEntryWithMetaDto;
}

export const ViewEffortEntry = ({ entry }: Props) => {
  const router = useRouter();
  const [isDeleteDialogOpen, toggleIsDeleteDialogOpen] = useToggler();

  const entryDate = new Date(entry.date);
  const date = getLocaleDate(entryDate);
  const dateString = [date.weekday, date.day, date.month, date.year].join(" ");
  const time = getLocaleTime(entryDate);
  const title = [dateString, time].join(" - ");

  const onDelete = async () => {
    if (entry) {
      await database.entries.delete(entry.id);
      router.push(Routes.HOME);
    }
  };

  return (
    <>
      <article className="flex max-h-full flex-col gap-6 overflow-y-hidden">
        <div className="flex flex-col gap-4">
          <HeaderWithLinkBack href={Routes.HOME}>{title}</HeaderWithLinkBack>

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

        <div>
          <div>
            <h3 className="text-lg">Effort</h3>
            <p>{entry.effort.title}</p>
          </div>

          <div>
            <h3 className="text-lg">Description</h3>
            <p>{entry.description}</p>
          </div>
        </div>
      </article>

      <DialogAlert
        title="delete entry"
        description="confirmation to delete an effort entry"
        isOpen={isDeleteDialogOpen}
        onOpenChange={toggleIsDeleteDialogOpen}
        cancelText="Cancel"
        actionText="Delete"
        action={onDelete}
      >
        Are you sure you want to delete this entry?
      </DialogAlert>
    </>
  );
};
