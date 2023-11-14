import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.uuid("user_id").defaultTo(knex.fn.uuid()).primary();
        table.string("belongs_to").notNullable();
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("users");
}

