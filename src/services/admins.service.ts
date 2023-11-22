import { getDb } from "../database/knex.service"

export const getAdmins = async () => {
    const db = await getDb()
    const admins = await db.select('*').from('admins')

    return admins
}