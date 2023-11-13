import { getDbPassword } from "./dbCreds.service";
import { Knex, knex } from 'knex';

let connection: Knex | undefined;

export const getDbConnection = async () => {
    if (!connection) {
        connection = await connectToDb();
    }
    return connection
};

const connectToDb = async (): Promise<Knex> => {
    // Establish a connection to the database.
    const dbPassword = await getDbPassword()
    return knex({
        client: 'pg',
        connection: `postgres://xjeiwdgy:${dbPassword}@suleiman.db.elephantsql.com/xjeiwdgy`
    });
};


