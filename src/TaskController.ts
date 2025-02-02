import type { Request, Response } from 'express';
import { Controller } from './Controller.ts';
import { MediaLibraryRepository } from './MediaLibraryRepository.ts';
import { ScanLibraryService } from './ScanLibraryService.ts';

export class TaskController extends Controller {
	mediaLibraryRepository = new MediaLibraryRepository();
	scanLibraryService = new ScanLibraryService();

	constructor() {
		super();
		this.router.post('/scan_library', this.scanLibrary);
	}

	async scanLibrary(_: Request, res: Response) {
		const libraries = await this.mediaLibraryRepository.getAll();

		for (const library of libraries) {
			await this.scanLibraryService.scanLibrary(library);
		}

		res.sendStatus(200);
	}
}
