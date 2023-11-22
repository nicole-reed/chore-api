import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("chore_lists", (table) => {
        table.uuid("chore_list_id").defaultTo(knex.fn.uuid()).primary();
        table.uuid("admin_id");
        table.foreign("admin_id").references("admins.admin_id");
        table.string("title").notNullable();
        table.uuid("assigned_to");
        table.foreign("assigned_to").references("users.user_id");
        table.date("deadline");
        table.string("value");
        table.string("notes");
        table.boolean("complete").notNullable().defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("chore_lists");
}
