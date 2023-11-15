import { getDbConnection } from "../database/knex.service"

export const getUsers = async () => {
    const dbConnection = await getDbConnection()
    const users = await dbConnection.select('*').from('users')

    return users
}