import { EffortEntryWithMetaDto } from "~/dto/effort-entry";
import { getLocaleTime } from "~/utilities/date";

interface Props {
  entry: EffortEntryWithMetaDto;
}

export const EffortEntry = ({ entry }: Props) => {
  const time = getLocaleTime(new Date(entry.date));

  return (
    <li
      key={entry.id}
      className="flex select-none items-start gap-2 before:inline-block before:text-silver before:content-['●'] last:pb-6"
    >
      <div className="flex grow flex-col">
        <div className="flex justify-between">
          <span className="font-light text-silver">{time}</span>

          <div
            role="figure"
            className="h-3 w-3 rounded-full border border-black"
            style={{ backgroundColor: entry.effort.color }}
          />
        </div>

        <p>{entry.description}</p>
      </div>
    </li>
  );
};
