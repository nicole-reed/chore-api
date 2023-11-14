import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("admins", (table) => {
        table.uuid("admin_id").defaultTo(knex.fn.uuid()).primary();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("admins");
}