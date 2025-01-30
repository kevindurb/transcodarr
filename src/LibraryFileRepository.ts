import type { LibraryFile } from 'knex/types/tables.js';
import { db } from './db.ts';

type UpdateData = Partial<LibraryFile>;

export class LibraryFileRepository {
	private table = () => db('libraryFile');

	async create(mediaLibraryId: number, data: UpdateData) {
		await this.table()
			.insert({ mediaLibraryId, ...data })
			.onConflict('filepath')
			.merge(['filepath', 'codec', 'sizeBytes']);
	}

	async getForMediaLibrary(mediaLibraryId: number) {
		return await this.table()
			.select(
				'id',
				'mediaLibraryId',
				'filepath',
				'codec',
				'sizeBytes',
				'updatedAt',
				'createdAt',
			)
			.where({ mediaLibraryId });
	}
}
