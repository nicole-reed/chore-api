import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chores", (table) => {
        table.uuid("chore_id").defaultTo(knex.fn.uuid()).primary();
        table.string("chore_list_id").notNullable();
        table.string("admin_id").notNullable();
        table.string("title").notNullable();
        table.string("description");
        table.string("assigned_to").notNullable();
        table.date("deadline");
        table.string("value");
        table.enu("status", ["complete", "incomplete", "blocked"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("chores")
}

