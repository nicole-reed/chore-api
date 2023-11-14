import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chore_lists", (table) => {
        table.uuid("chore_list_id").defaultTo(knex.fn.uuid()).primary();
        table.string("admin_id").notNullable();
        table.string("title").notNullable();
        table.string("assigned_to").notNullable();
        table.date("deadline");
        table.string("value");
        table.boolean("status").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("chore_lists");
}

