import { Glob } from 'glob';
import type { MediaLibrary } from 'knex/types/tables.js';
import { FFProbeService } from './FFProbeService.ts';
import { LibraryFileRepository } from './LibraryFileRepository.ts';

export class ScanLibraryService {
	static supportedFileExtensions = [
		'webm',
		'm4v',
		'3gp',
		'nsv',
		'ty',
		'strm',
		'rm',
		'rmvb',
		'm3u',
		'ifo',
		'mov',
		'qt',
		'divx',
		'xvid',
		'bivx',
		'nrg',
		'pva',
		'wmv',
		'asf',
		'asx',
		'ogm',
		'ogv',
		'm2v',
		'avi',
		'bin',
		'dat',
		'dvr-ms',
		'mpg',
		'mpeg',
		'mp4',
		'avc',
		'vp3',
		'svq3',
		'nuv',
		'viv',
		'dv',
		'fli',
		'flv',
		'wpl',
		'img',
		'iso',
		'vob',
		'mkv',
		'mk3d',
		'ts',
		'wtv',
		'm2ts',
	];

	ffprobeService = new FFProbeService();
	libraryFileRepository = new LibraryFileRepository();

	async scanLibrary(library: MediaLibrary) {
		console.log(`Scanning path: ${library.path}`);

		const filesGlob = new Glob(
			ScanLibraryService.supportedFileExtensions.map((ext) => `**/*.${ext}`),
			{ cwd: library.path, absolute: true },
		);

		for await (const file of filesGlob) {
			try {
				const { streams, format } = await this.ffprobeService.probe(file);
				const videoStream = streams.find(
					(stream) => stream.codec_type === 'video',
				);
				await this.libraryFileRepository.create(library.id, {
					filepath: file,
					videoCodec: videoStream?.codec_name,
					videoWidth: videoStream?.width,
					videoHeight: videoStream?.height,
					sizeBytes: Number.parseInt(format.size),
				});
			} catch (err) {
				console.error(`Error probing file: ${file}`, err);
			}
		}

		console.log(`Done scanning path: ${library.path}`);
	}
}
