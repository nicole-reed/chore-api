import { getDbPassword } from "./dbCreds.service";
import { Knex, knex } from 'knex';
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

let connection: Knex | undefined;

export const getDbConnection = async () => {
    if (!connection) {
        connection = await connectToDb();
    }
    return connection
};

const connectToDb = async (): Promise<Knex> => {
    const connector = new Connector();
    const clientOpts = await connector.getOptions({
        instanceConnectionName: 'choreme:us-central1:choreme-db',
        ipType: IpAddressTypes.PUBLIC,
    });
    const dbConfig = {
        client: 'pg',
        connection: {
            ...clientOpts,
            user: 'postgres',
            password: await getDbPassword(),
            database: 'choreme'
        }
    };
    // Establish a connection to the database.
    return knex(dbConfig);
};


