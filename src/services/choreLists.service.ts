import { getDbConnection } from "../database/knex.service"

export const getChoreLists = async () => {
    const dbConnection = await getDbConnection()
    const choreLists = await dbConnection.select('*').from('chore_lists')

    return choreLists
}