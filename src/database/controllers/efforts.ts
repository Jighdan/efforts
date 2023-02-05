import { client } from "~/database/client";
import { EffortDto, CreateEffortDto } from "~/common/dto/effort";
import { Channels } from "~/common/enums/database-channels";

export class EffortsController {
  private readonly client = client;
  private readonly table = "efforts";
  private readonly query = this.client.from(this.table);

  public getAll = async () => {
    return this.query.select("*").order("created_at", { ascending: true });
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
