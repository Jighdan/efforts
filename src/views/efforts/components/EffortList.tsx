import { EffortDto } from "~/dto/effort";

import { Effort } from "./Effort";

interface Props {
  efforts: EffortDto[];
}

export const EffortList = ({ efforts }: Props) => (
  <ul className="grid auto-rows-fr gap-4">
    {efforts.map((effort) => (
      <Effort key={effort.id} effort={effort} />
    ))}
  </ul>
);
