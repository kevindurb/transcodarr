import humps from 'humps';
import type { Knex } from 'knex';

const config: Knex.Config = {
	client: 'better-sqlite3',
	connection: {
		filename: 'database.sqlite',
	},
	migrations: {
		extension: 'ts',
		directory: './src/migrations',
	},
	postProcessResponse: (result) => humps.camelizeKeys(result),
	wrapIdentifier: (value, origImpl) => origImpl(humps.decamelize(value)),
	useNullAsDefault: true,
};

export default config;
