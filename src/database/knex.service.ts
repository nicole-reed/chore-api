import { getDbPassword } from "../services/dbCreds.service";
import { Knex, knex } from 'knex';

let connection: Knex | undefined;

export const getDbConnection = async () => {
    if (!connection) {
        connection = await connectToDb();
    }
    return connection
};

export const getKnexConfig = (): Knex.Config => {
    return {
        client: 'pg',
        connection: async () => {
            const password = await getDbPassword()
            return { user: 'xjeiwdgy', password, host: 'suleiman.db.elephantsql.com' }
        }
    }
};

const connectToDb = async (): Promise<Knex> => {
    const config = getKnexConfig()
    return knex(config);
};

