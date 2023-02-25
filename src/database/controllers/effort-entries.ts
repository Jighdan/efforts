import { client } from "~/database/client";
import { EffortDto } from "~/dto/effort";
import {
  EffortEntryDto,
  CreateEffortEntryDto,
  EffortEntryWithMetaDto,
} from "~/dto/effort-entry";
import { getDateEndTime, getDateStartTime } from "~/utilities/date";
import { Channels } from "~/enums/database-channels";

export class EffortsEntriesController {
  private readonly client = client;
  private readonly table = "efforts_entries";

  public getAllFromToday = async (date = new Date()) => {
    const dates = {
      start: getDateStartTime(date).toISOString(),
      end: getDateEndTime(date).toISOString(),
    };

    return this.getQuery()
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
    return this.getQuery()
      .select()
      .eq("effort_id", id)
      .order("date", { ascending: true });
  };

  public create = async (dto: CreateEffortEntryDto) => {
    return this.getQuery().insert(dto);
  };

  public delete = async (id: EffortEntryDto["id"]) => {
    return this.getQuery().delete().eq("id", id);
  };

  public subscribeToChanges = (callback: () => void, userId: string) => {
    const filter = ``;

    return this.client
      .channel(Channels.ENTRIES_ALL)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: this.table },
        () => callback()
      );
  };

  private getQuery = () => {
    return this.client.from(this.table)
  }
}
