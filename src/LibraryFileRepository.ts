import type { LibraryFile } from 'knex/types/tables.js';
import { db } from './db.ts';

type UpdateData = Partial<LibraryFile>;

export class LibraryFileRepository {
	private table = () => db('libraryFile');
	private static columns = [
		'id',
		'mediaLibraryId',
		'filepath',
		'videoCodec',
		'videoWidth',
		'videoHeight',
		'sizeBytes',
		'updatedAt',
		'createdAt',
	] as const;

	async create(mediaLibraryId: number, data: UpdateData) {
		await this.table()
			.insert({ mediaLibraryId, ...data })
			.onConflict('filepath')
			.merge([
				'filepath',
				'videoCodec',
				'videoWidth',
				'videoHeight',
				'sizeBytes',
			]);
	}

	async getAll() {
		return await this.table().select(LibraryFileRepository.columns);
	}

	async getForMediaLibrary(mediaLibraryId: number) {
		return await this.table()
			.select(LibraryFileRepository.columns)
			.where({ mediaLibraryId });
	}
}
