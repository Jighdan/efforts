import { client } from "~/database/client";
import { EffortDto } from "~/common/dto/effort";
import {
  EffortEntryDto,
  CreateEffortEntryDto,
  EffortEntryWithMetaDto,
} from "~/common/dto/effort-entry";
import { getDateEndTime, getDateStartTime } from "~/common/utilities/date";
import { Channels } from "~/common/enums/database-channels";

export class EffortsEntriesController {
  private readonly client = client;
  private readonly table = "efforts_entries";
  private readonly query = this.client.from(this.table);

  public getAllFromToday = async (date = new Date()) => {
    const dates = {
      start: getDateStartTime(date).toISOString(),
      end: getDateEndTime(date).toISOString(),
    };

    return this.query
      .select(
        `
        id,
        date,
        description,
        effort:efforts (
          id,
          title,
          color
        )
      `
      )
      .gt("date", dates.start)
      .lt("date", dates.end)
      .order("date", { ascending: true })
      .returns<EffortEntryWithMetaDto>();
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

  public subscribeToChanges = (callback: () => void) => {
    return this.client
      .channel(Channels.ENTRIES_ALL)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: this.table },
        () => callback()
      );
  };
}
