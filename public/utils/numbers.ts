export const safeParseInt = (value: unknown): undefined | number => {
	if (typeof value === 'number') return value;
	if (typeof value !== 'string') return undefined;
	const parsed = Number.parseInt(value);
	return Number.isNaN(parsed) ? undefined : parsed;
};
