import { client } from '~/database/client';
import { EffortDto, CreateEffortDto } from '~/common/dto/effort';

export class EffortsController {
	private readonly client = client;
	private readonly query = this.client.from('efforts');

	public getAll = async () => {
		return this.query.select();
	};

	public getCount = async () => {
		return this.query.select('*', { count: 'exact', head: true })
	};

	public create = async (dto: CreateEffortDto) => {
		return this.query.insert(dto);
	};

	public delete = async (id: EffortDto['id']) => {
		return this.query.delete().eq('id', id);
	}
};
