import { EffortEntry } from "~/components/EffortEntry";
import { EffortWithMetaDto } from "~/dto/effort";

interface Props {
  effort: EffortWithMetaDto;
}

export const EffortEntries = ({ effort }: Props) => (
  <ul className="flex flex-col gap-4 overflow-y-auto">
    {effort?.entries.map((entry) => (
      <EffortEntry key={entry.id} entry={{ ...entry, effort }} />
    ))}
  </ul>
);
