import { EffortsEntriesController } from "~/database/controllers/effort-entries";
import { EffortsController } from "~/database/controllers/efforts";

export const database = {
  efforts: new EffortsController(),
  entries: new EffortsEntriesController(),
};
