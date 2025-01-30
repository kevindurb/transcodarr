import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('libraryFile', (table) => {
		table.increments('id');
		table.string('filepath').notNullable().unique();
		table.string('codec').notNullable();
		table.integer('sizeBytes').notNullable();
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('libraryFile');
}
