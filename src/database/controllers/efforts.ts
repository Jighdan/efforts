import { client } from "~/database/client";
import {
  EffortDto,
  CreateEffortDto,
  EffortWithMetaDto,
} from "~/dto/effort";
import { Channels } from "~/enums/database-channels";

export class EffortsController {
  private readonly client = client;
  private readonly table = "efforts";

  public getAll = async () => {
    const userId = await this.getUserId()

    return this.getQuery()
      .select(
        `
      id,
      title,
      color,
      created_at
    `
      )
      .eq('user_id', userId)
      .order("created_at", { ascending: true })
      .returns<EffortDto>();
  };

  public getById = async (id: EffortDto["id"]) => {
    return this.getQuery()
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
    return this.getQuery().select("*", { count: "exact", head: true });
  };

  public create = async (dto: CreateEffortDto) => {
    return this.getQuery().insert(dto);
  };

  public delete = async (id: EffortDto["id"]) => {
    return this.getQuery().delete().eq("id", id);
  };

  public subscribeToChanges = (callback: () => void, userId: string) => {
    const filter = `user_id=eq.${userId}`

    return this.client
      .channel(Channels.EFFORTS_ALL)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: this.table, filter },
        () => callback()
      );
  };

  public subscribeToEffortChanges = (effortId: EffortDto['id'], callback: () => void, userId: string) => {
    const event = 'UPDATE';
    const filter = [`id=eq.${effortId}`, `user_id=eq.${userId}`].join('&');

    return this.client
      .channel(Channels.EFFORT)
      .on('postgres_changes', { event, schema: 'public', table: this.table, filter }, callback)
  };

  private getQuery = () => {
    return this.client.from(this.table);
  }

  private getUserId = async () => {
    const { data } = await this.client.auth.getSession();
    return data.session?.user.id || null;
  }
}
