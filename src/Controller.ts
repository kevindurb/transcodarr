import { type Express, type Request, type Response, Router } from 'express';

export abstract class Controller {
	protected readonly router = Router();

	constructor() {
		this.router
			.get('/', this.list)
			.get('/:id', this.read)
			.post('/', this.create)
			.put('/:id', this.update)
			.delete('/:id', this.delete);
	}

	public getRouter() {
		return this.router;
	}

	protected async read(req: Request, res: Response): Promise<void> {
		res.sendStatus(501).end();
	}
	protected async list(req: Request, res: Response): Promise<void> {
		res.sendStatus(501).end();
	}
	protected async create(req: Request, res: Response): Promise<void> {
		res.sendStatus(501).end();
	}
	protected async update(req: Request, res: Response): Promise<void> {
		res.sendStatus(501).end();
	}
	protected async delete(req: Request, res: Response): Promise<void> {
		res.sendStatus(501).end();
	}
}
