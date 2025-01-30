import { Router } from 'express';
import { LibraryFileRepository } from './LibraryFileRepository.ts';
import { MediaLibraryRepository } from './MediaLibraryRepository.ts';

const libraryFileRepository = new LibraryFileRepository();
const mediaLibraryRepository = new MediaLibraryRepository();
const controller = Router();
export { controller as LibraryFileController };

controller.get('/media_libraries/:mediaLibraryId/files', async (req, res) => {
	const library = await mediaLibraryRepository.getOne(
		Number.parseInt(req.params.mediaLibraryId),
	);
	if (!library) {
		res.status(404).end();
		return;
	}

	res
		.status(200)
		.send(await libraryFileRepository.getForMediaLibrary(library.id));
});

controller.get('/files', async (_, res) => {
	res.status(200).send(await libraryFileRepository.getAll());
});
