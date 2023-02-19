import { client } from "~/database/client";
import {
  EffortDto,
  CreateEffortDto,
  EffortWithMetaDto,
} from "~/common/dto/effort";
import { Channels } from "~/common/enums/database-channels";

export class EffortsController {
  private readonly client = client;
  private readonly table = "efforts";
  private readonly query = this.client.from(this.table);

  public getAll = async () => {
    return this.query
      .select(
        `
      id,
      title,
      color,
      created_at
    `
      )
      .order("created_at", { ascending: true })
      .returns<EffortDto>();
  };

  public getById = async (id: EffortDto["id"]) => {
    return this.query
      .select(
        `
          id,
          title,
          color,
          created_at,
          entries:efforts_entries (
            id,
            date,
            description
          )
          `
      )
      .eq("id", id)
      .order("date", { foreignTable: "efforts_entries", ascending: true })
      .returns<EffortWithMetaDto>()
      .single();
  };

  public getCount = async () => {
    return this.query.select("*", { count: "exact", head: true });
  };

  public create = async (dto: CreateEffortDto) => {
    return this.query.insert(dto);
  };

  public delete = async (id: EffortDto["id"]) => {
    return this.query.delete().eq("id", id);
  };

  public subscribeToChanges = (callback: () => void) => {
    return this.client
      .channel(Channels.EFFORTS_ALL)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: this.table },
        () => callback()
      );
  };
}
