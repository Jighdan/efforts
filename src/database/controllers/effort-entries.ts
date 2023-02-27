import { client } from "~/database/client";
import { EffortDto } from "~/dto/effort";
import {
  CreateEffortEntryDto,
  EffortEntryDto,
  EffortEntryWithMetaDto,
} from "~/dto/effort-entry";
import { Channels } from "~/enums/database-channels";
import { getDateEndTime, getDateStartTime } from "~/utilities/date";

export class EffortsEntriesController {
  private readonly client = client;
  private readonly table = "efforts_entries";

  private readonly fragmentEffortEntryWithMeta = `
    id,
    date,
    description,
    effort:efforts (
      id,
      title,
      color
    )
  `;

  public getAllFromToday = async (date = new Date()) => {
    const dates = {
      start: getDateStartTime(date).toISOString(),
      end: getDateEndTime(date).toISOString(),
    };

    return this.getQuery()
      .select(this.fragmentEffortEntryWithMeta)
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

  public getById = async (id: EffortEntryDto["id"]) => {
    return this.getQuery()
      .select(this.fragmentEffortEntryWithMeta)
      .eq("id", id)
      .returns<EffortEntryWithMetaDto>()
      .single();
  };

  public create = async (dto: CreateEffortEntryDto) => {
    return this.getQuery().insert(dto);
  };

  public delete = async (id: EffortEntryDto["id"]) => {
    return this.getQuery().delete().eq("id", id);
  };

  public deleteAll = async (effortId: EffortDto["id"]) => {
    return this.getQuery().delete().eq("effort_id", effortId);
  };

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  public subscribeToChanges = (callback: () => void, _userId: string) => {
    return this.client
      .channel(Channels.ENTRIES_ALL)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: this.table },
        () => callback()
      );
  };

  private getQuery = () => {
    return this.client.from(this.table);
  };
}
