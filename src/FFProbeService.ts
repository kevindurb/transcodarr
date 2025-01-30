import childProcess from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(childProcess.exec);

interface FFProbeFormat {
	filename: string;
	duration: string;
	size: string;
}

interface FFProbeStream {
	index: number;
	codec_name: string;
	codec_type: 'video' | 'audio' | 'data';
}

interface FFProbeOutput {
	streams: FFProbeStream[];
	format: FFProbeFormat;
}

export class FFProbeService {
	async probe(filepath: string) {
		const { stdout } = await exec(
			[
				'ffprobe',
				'-v quiet',
				'-print_format json',
				'-show_format',
				'-show_streams',
				`"${filepath}"`,
			].join(' '),
		);
		return JSON.parse(stdout) as FFProbeOutput;
	}
}
