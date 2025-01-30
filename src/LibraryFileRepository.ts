import type { LibraryFile } from 'knex/types/tables.js';
import { db } from './db.ts';

type UpdateData = Partial<LibraryFile>;

export class LibraryFileRepository {
	private table = () => db('libraryFile');

	async create(data: UpdateData) {
		await this.table()
			.insert(data)
			.onConflict('filepath')
			.merge(['filepath', 'codec', 'sizeBytes']);
	}
}
