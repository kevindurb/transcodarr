import type { Preset } from 'knex/types/tables.js';
import { db } from './db.ts';

type UpdateData = Partial<Preset>;

export class PresetRepository {
	private table = () => db('preset');
	private static columns = ['id', 'name', 'data', 'updatedAt', 'createdAt'];

	async getAll() {
		return await this.table().select(PresetRepository.columns);
	}

	async getOne(id: number) {
		return await this.table().first(PresetRepository.columns).where({ id });
	}

	async create(data: UpdateData) {
		const [id] = await this.table().insert(data);
		if (!id) throw new Error();
		return id;
	}
}
