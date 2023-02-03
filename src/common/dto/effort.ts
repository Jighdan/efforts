import { Database } from "~/database/interfaces";

type Table = Database['public']['Tables']['efforts'];

export type EffortDto = Table['Row'];
export type CreateEffortDto = Table['Insert'];
