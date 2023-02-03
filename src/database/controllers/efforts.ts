import { client } from '~/database/client';

export class EffortsController {
	private readonly client = client;
	private readonly query = this.client.from('efforts');

	public getAll = async () => {
		return this.query.select();
	};

	public getCount = async () => {
		return this.query.select('*', { count: 'exact', head: true })
	};
};
