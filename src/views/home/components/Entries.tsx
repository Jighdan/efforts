import { EffortEntry } from "~/components/EffortEntry";
import { EffortEntryWithMetaDto } from "~/dto/effort-entry";

interface Props {
  entries: EffortEntryWithMetaDto[];
}

export const Entries = ({ entries }: Props) => (
  <ul className="flex list-disc flex-col gap-6 overflow-y-auto">
    {entries.map((entry) => (
      <EffortEntry key={entry.id} entry={entry} />
    ))}
  </ul>
);
