import bodyParser from 'body-parser';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { ZodError } from 'zod';
import { LibraryFileController } from './LibraryFileController.ts';
import { MediaLibraryController } from './MediaLibraryController.ts';
import { TaskController } from './TaskController.ts';

const app = express();
app.use(bodyParser.json());
app.use(MediaLibraryController);
app.use(TaskController);
app.use(LibraryFileController);

app.use((err: unknown, _: Request, res: Response, next: NextFunction) => {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof ZodError) {
		res.status(400).send(err.format());
		return;
	}

	res.sendStatus(500);
});

app.listen(process.env.PORT, () =>
	console.log(`API Listening at http://localhost:${process.env.PORT}`),
);
