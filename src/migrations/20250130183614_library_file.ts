import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('libraryFile', (table) => {
		table.increments('id');
		table.integer('mediaLibraryId').notNullable().references('mediaLibrary.id');
		table.string('filepath').notNullable().unique();
		table.string('videoCodec').notNullable();
		table.integer('videoWidth').notNullable();
		table.integer('videoHeight').notNullable();
		table.integer('sizeBytes').notNullable();
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('libraryFile');
}
