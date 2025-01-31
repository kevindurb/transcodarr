import knex from 'knex';
import knexConfig from '../knexfile.ts';

export const db = knex(knexConfig);

declare module 'knex/types/tables.js' {
	interface MediaLibrary {
		id: number;
		path: string;
		createdAt: Date;
		updatedAt: Date;
	}

	interface LibraryFile {
		id: number;
		mediaLibraryId: number;
		filepath: string;
		videoCodec: string;
		videoWidth: number;
		videoHeight: number;
		sizeBytes: number;
		createdAt: Date;
		updatedAt: Date;
	}

	interface Tables {
		mediaLibrary: MediaLibrary;
	}
}
