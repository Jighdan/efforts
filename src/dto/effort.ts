import { Database } from "~/database/interfaces";
import { EffortEntryDto } from "~/dto/effort-entry";

type Table = Database["public"]["Tables"]["efforts"];

export type EffortDto = Omit<Table["Row"], "user_id">;
export type CreateEffortDto = Table["Insert"];

export interface EffortWithMetaDto extends EffortDto {
  entries: Omit<EffortEntryDto, "effort_id" | "created_at">[];
}
