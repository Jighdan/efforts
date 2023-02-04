import { client } from "~/database/client";
import { EffortDto } from "~/common/dto/effort";
import {
  EffortEntryDto,
  CreateEffortEntryDto,
} from "~/common/dto/effort-entry";
import { getDateEndTime, getDateStartTime } from "~/common/utilities/date";

export class EffortsEntriesController {
  private readonly client = client;
  private readonly query = this.client.from("efforts_entries");

  public getAllFromToday = async (date = new Date()) => {
    const dates = {
      start: getDateStartTime(date),
      end: getDateEndTime(date),
    };

    const startDate = dates.start.toISOString();
    const endDate = dates.end.toISOString();

    return this.query
      .select(
        `
        id,
        date,
        description,
        efforts (
          title
        )
      `
      )
      .gt("date", startDate)
      .lt("date", endDate)
      .order("date", { ascending: true });
  };

  public getByEffortId = async (id: EffortDto["id"]) => {
    return this.query
      .select()
      .eq("effort_id", id)
      .order("date", { ascending: true });
  };

  public create = async (dto: CreateEffortEntryDto) => {
    return this.query.insert(dto);
  };

  public delete = async (id: EffortEntryDto["id"]) => {
    return this.query.delete().eq("id", id);
  };
}
