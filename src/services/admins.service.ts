import { getDbConnection } from "../database/knex.service"

export const getAdmins = async () => {
    const dbConnection = await getDbConnection()
    const admins = await dbConnection.select('*').from('admins')

    return admins
}