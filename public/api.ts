import type { LibraryFile, MediaLibrary } from 'knex/types/tables.js';

const fetchJSON = (
	input: string | URL | globalThis.Request,
	init?: RequestInit,
) => fetch(input, init).then((response) => response.json());

export const getLibraries = (): Promise<MediaLibrary[]> =>
	fetchJSON('/api/media_libraries');

export const getLibraryFiles = (
	mediaLibraryId: number,
): Promise<LibraryFile[]> =>
	fetchJSON(`/api/media_libraries/${mediaLibraryId}/files`);
