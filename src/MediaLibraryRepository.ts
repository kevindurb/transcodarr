import type { MediaLibrary } from 'knex/types/tables.js';
import { db } from './db.ts';

type UpdateData = Partial<MediaLibrary>;

export class MediaLibraryRepository {
	private table = () => db('mediaLibrary');

	async getAll() {
		return await this.table().select('id', 'path', 'updatedAt', 'createdAt');
	}

	async getOne(id: number) {
		return await this.table()
			.first('id', 'path', 'updatedAt', 'createdAt')
			.where({ id });
	}

	async create(data: UpdateData) {
		const [id] = await this.table().insert(data);
		if (!id) throw new Error('Unknown error creating media library');
		return id;
	}

	async update(id: number, data: UpdateData) {
		await this.table().update(data).where({ id });
	}

	async delete(id: number) {
		await this.table().delete().where({ id });
	}
}
