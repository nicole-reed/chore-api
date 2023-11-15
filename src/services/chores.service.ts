import { getDbConnection } from "../database/knex.service"

export const getChores = async () => {
    const dbConnection = await getDbConnection()
    const chores = await dbConnection.select('*').from('chores')

    return chores
}