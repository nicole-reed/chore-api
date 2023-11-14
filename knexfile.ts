import { getKnexConfig } from "./src/database/knex.service";

const config = getKnexConfig();
config.migrations = {
  tableName: "knex_migrations",
  directory: "./src/database/migrations"
}

export default config;