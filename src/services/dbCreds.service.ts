import { getSecret } from "./secret.service";

let dbPassword: string | undefined
let dbUser: string | undefined

export const getDbPassword = async (): Promise<string> => {
    if (!dbPassword) {
        dbPassword = await getSecret('choreme-db-password');
    }
    return dbPassword
};

export const getDbUser = async (): Promise<string> => {
    if (!dbUser) {
        dbUser = await getSecret('choreme-db-user');
    }
    return dbUser
}

