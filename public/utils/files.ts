export const getHumanFileSize = (bytes: number, si = false, dp = 1) => {
	const thresh = si ? 1000 : 1024;

	if (Math.abs(bytes) < thresh) {
		return `${bytes} B`;
	}

	const units = si
		? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		: ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	let u = -1;
	const r = 10 ** dp;
	let value = bytes;

	do {
		value /= thresh;
		++u;
	} while (
		Math.round(Math.abs(value) * r) / r >= thresh &&
		u < units.length - 1
	);

	return `${value.toFixed(dp)} ${units[u]}`;
};

export const getHumanVideoSize = (
	width: number,
	height: number,
): 'SD' | 'HD' | 'FHD' | 'UHD' => {
	const thresholds = {
		HD: [1280, 720],
		FHD: [1920, 1080],
		UHD: [3840, 2160],
	} as const;

	const above = (w: number, h: number, [x, y]: readonly [number, number]) =>
		w >= x || h >= y;

	if (above(width, height, thresholds.UHD)) {
		return 'UHD';
	}

	if (above(width, height, thresholds.FHD)) {
		return 'FHD';
	}

	if (above(width, height, thresholds.HD)) {
		return 'HD';
	}

	return 'SD';
};
