import { Database } from "~/database/interfaces";

type Table = Database['public']['Tables']['efforts_entries'];

export type EffortEntryDto = Table['Row'];
export type CreateEffortEntryDto = Table['Insert'];
