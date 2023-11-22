import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chores", (table) => {
        table.uuid("chore_id").defaultTo(knex.fn.uuid()).primary();
        table.uuid("admin_id");
        table.foreign("admin_id").references("admins.admin_id")
        table.string("title").notNullable();
        table.string("description");
        table.uuid("assigned_to");
        table.foreign("assigned_to").references("users.user_id");
        table.date("deadline");
        table.string("value");
        table.enu("status", ["complete", "incomplete", "blocked"]);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("chores")
}

