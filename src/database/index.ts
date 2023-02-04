import { EffortsController } from "~/database/controllers/efforts";
import { EffortsEntriesController } from "~/database/controllers/effort-entries";

export const database = {
  efforts: new EffortsController(),
  entries: new EffortsEntriesController(),
};
