import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('mediaLibrary', (table) => {
		table.increments('id');
		table.string('path').notNullable();
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('mediaLibrary');
}
