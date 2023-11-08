import { getSecret } from "./secret.service";

let dbPassword: string | undefined

export const getDbPassword = async (): Promise<string> => {
    if (!dbPassword) {
        dbPassword = await getSecret('choreme-db-password');
    }
    return dbPassword
}