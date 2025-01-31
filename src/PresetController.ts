import { Router } from 'express';
import { z } from 'zod';
import { PresetRepository } from './PresetRepository.ts';

const presetRepository = new PresetRepository();
const controller = Router();
export { controller as PresetController };

const CreatePresetBody = z
	.object({
		name: z.string(),
		data: z.string(),
	})
	.strict();

controller.get('/presets', async (_, res) => {
	res.status(200).send(await presetRepository.getAll());
});

controller.post('/presets', async (req, res) => {
	const id = await presetRepository.create(
		await CreatePresetBody.parseAsync(req.body),
	);

	res.status(200).send(await presetRepository.getOne(id));
});
