import { Database } from "~/database/interfaces";
import { EffortDto } from "~/dto/effort";

type Table = Database["public"]["Tables"]["efforts_entries"];

export type EffortEntryDto = Table["Row"];
export type CreateEffortEntryDto = Table["Insert"];
export interface EffortEntryWithMetaDto
  extends Omit<EffortEntryDto, "effort_id"> {
  effort: Pick<EffortDto, "color" | "title" | "id">;
}
