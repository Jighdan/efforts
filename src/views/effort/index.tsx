import Link from "next/link";
import { useRouter } from "next/router";

import { IconArrowLeft } from "~/assets/icons/IconArrowLeft";
import { Button } from "~/components/Button";
import { DialogAlert } from "~/components/DialogAlert";
import { useEffortContext } from "~/contexts/effort";
import { database } from "~/database";
import { Routes } from "~/enums/routes";
import { useToggler } from "~/hooks/useToggler";

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
      <div className="flex max-h-full flex-col gap-6 overflow-y-hidden">
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-2">
            <Link href={Routes.ALL_EFFORTS} replace title="All efforts">
              <IconArrowLeft className="size-sm" />
            </Link>

            <h2 className="text-2xl">{effort?.title}</h2>
          </header>

          <aside className="flex items-center gap-4">
            <Button variant="outlined" disabled>
              Edit
            </Button>

            <Button variant="outlined" onClick={toggleIsDeleteDialogOpen}>
              Delete
            </Button>
          </aside>
        </div>

        {effort?.entries.length ? (
          <ul className="flex flex-col gap-4 overflow-y-auto">
            {effort?.entries.map((entry) => (
              <li key={entry.id}>
                <div>
                  <h4 className="text-light text-silver">
                    {entry?.id} - {entry?.date}
                  </h4>
                  <p>{entry.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg text-silver">
            No Entries for this effort
          </p>
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
