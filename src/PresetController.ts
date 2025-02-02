import { type Request, type Response, Router } from 'express';
import { z } from 'zod';
import { Controller } from './Controller.ts';
import { PresetRepository } from './PresetRepository.ts';

export class PresetController extends Controller {
	static CreatePresetBody = z
		.object({
			name: z.string(),
			data: z.string(),
		})
		.strict();

	private presetRepository = new PresetRepository();

	override async list(_: Request, res: Response) {
		res.status(200).send(await this.presetRepository.getAll());
	}

	override async create(req: Request, res: Response) {
		const id = await this.presetRepository.create(
			await PresetController.CreatePresetBody.parseAsync(req.body),
		);

		res.status(200).send(await this.presetRepository.getOne(id));
	}
}
