import { Router } from 'express';
import { z } from 'zod';
import { MediaLibraryRepository } from './MediaLibraryRepository.ts';

const mediaLibraryRepository = new MediaLibraryRepository();
const controller = Router();
export { controller as MediaLibraryController };

const CreateMediaLibraryBody = z
	.object({
		path: z.string(),
	})
	.strict();

const UpdateMediaLibraryBody = z
	.object({
		path: z.string().optional(),
	})
	.strict();

controller.get('/media_libraries', async (_, res) => {
	res.status(200).send(await mediaLibraryRepository.getAll());
});

controller.get('/media_libraries/:id', async (req, res) => {
	const library = await mediaLibraryRepository.getOne(
		Number.parseInt(req.params.id),
	);
	if (!library) {
		res.status(404).end();
		return;
	}
	res.status(200).send(library);
});

controller.post('/media_libraries', async (req, res) => {
	const id = await mediaLibraryRepository.create(
		await CreateMediaLibraryBody.parseAsync(req.body),
	);
	const library = await mediaLibraryRepository.getOne(id);
	res.status(201).send(library);
});

controller.patch('/media_libraries/:id', async (req, res) => {
	const library = await mediaLibraryRepository.getOne(
		Number.parseInt(req.params.id),
	);

	if (!library) {
		res.status(404).end();
		return;
	}

	await mediaLibraryRepository.update(
		library.id,
		await UpdateMediaLibraryBody.parseAsync(req.body),
	);

	res.status(200).send(await mediaLibraryRepository.getOne(library.id));
});

controller.delete('/media_libraries/:id', async (req, res) => {
	const library = await mediaLibraryRepository.getOne(
		Number.parseInt(req.params.id),
	);

	if (!library) {
		res.status(404).end();
		return;
	}

	await mediaLibraryRepository.delete(library.id);
	res.sendStatus(200);
});
