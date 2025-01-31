import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('preset', (table) => {
		table.increments('id');
		table.string('name').notNullable().unique();
		table.json('data').notNullable();
		table.timestamps(false, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('preset');
}
