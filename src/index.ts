import { startDevServer } from '@web/dev-server';
import { esbuildPlugin } from '@web/dev-server-esbuild';
import bodyParser from 'body-parser';
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express';
import { ZodError } from 'zod';
import { LibraryFileController } from './LibraryFileController.ts';
import { MediaLibraryController } from './MediaLibraryController.ts';
import { PresetController } from './PresetController.ts';
import { TaskController } from './TaskController.ts';

const app = express();
app.use(bodyParser.json());
app.use(
	'/api',
	MediaLibraryController,
	TaskController,
	LibraryFileController,
	PresetController,
);

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

const server = app.listen(process.env.PORT, () =>
	console.log(`API Listening at http://localhost:${process.env.PORT}`),
);

const devServer = await startDevServer({
	logStartMessage: false,
	config: {
		watch: true,
		nodeResolve: true,
		appIndex: './public/index.html',
		rootDir: './public',
		middlewareMode: { server },
		plugins: [
			esbuildPlugin({
				ts: true,
				target: 'auto-always',
				tsconfig: './tsconfig.json',
			}),
		],
	},
});

app.use(devServer.koaApp.callback());
