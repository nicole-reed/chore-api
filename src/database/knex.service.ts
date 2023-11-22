import { getDbPassword, getDbUser } from "../services/dbCreds.service";
import { Knex, knex } from 'knex';

let db: Knex | undefined;

export const getDb = async () => {
    if (!db) {
        db = await connectToDb();
    }
    return db
};

export const getKnexConfig = (): Knex.Config => {
    return {
        client: 'pg',
        connection: async () => {
            const password = await getDbPassword()
            const user = await getDbUser()
            return { user, password, host: 'suleiman.db.elephantsql.com' }
        }
    }
};

const connectToDb = async (): Promise<Knex> => {
    const config = getKnexConfig()
    return knex(config);
};

