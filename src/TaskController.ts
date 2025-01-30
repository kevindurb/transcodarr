import { Router } from 'express';
import { MediaLibraryRepository } from './MediaLibraryRepository.ts';
import { ScanLibraryService } from './ScanLibraryService.ts';

const mediaLibraryRepository = new MediaLibraryRepository();
const scanLibraryService = new ScanLibraryService();
const router = Router();
export { router as TaskController };

router.post('/tasks/scan_library', async (_, res) => {
	const libraries = await mediaLibraryRepository.getAll();

	for (const library of libraries) {
		await scanLibraryService.scanLibrary(library);
	}

	res.sendStatus(200);
});
